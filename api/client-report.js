// Galaxy IT — Monthly Client Performance Report
// Pulls data from GHL API, generates report with AI, sends via email
// Triggered by Vercel Cron or manual call

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(204).end();

  var GHL_API_KEY = process.env.GHL_API_KEY;
  var GROQ_KEY = process.env.GROQ_API_KEY;

  if (!GHL_API_KEY) return res.status(500).json({ error: 'GHL_API_KEY not configured' });
  if (!GROQ_KEY) return res.status(500).json({ error: 'GROQ_API_KEY not configured' });

  // Client config — location IDs and contact info
  var CLIENTS = getClients();

  // If specific client requested
  var targetClient = req.query.client || req.body?.client || null;
  var sendEmail = req.query.send === 'true' || req.body?.send === true;

  var results = [];

  for (var i = 0; i < CLIENTS.length; i++) {
    var client = CLIENTS[i];
    if (targetClient && client.id !== targetClient) continue;

    try {
      // Pull GHL data
      var data = await pullGHLData(client.locationId, GHL_API_KEY);

      // Generate AI report
      var report = await generateReport(client, data, GROQ_KEY);

      // Send if requested
      if (sendEmail) {
        await sendReportEmail(client, report, GHL_API_KEY);
        await sendReportWhatsApp(client, report, GHL_API_KEY);
      }

      results.push({ client: client.name, status: 'ok', report: report });
    } catch (err) {
      results.push({ client: client.name, status: 'error', error: err.message });
    }
  }

  return res.status(200).json({ results: results });
};

// ---- Client List ----
// UPDATE THIS with your actual client location IDs
function getClients() {
  return [
    { id: 'client1', name: 'Client 1', locationId: 'LOCATION_ID_HERE', email: 'client1@email.com', phone: '+1XXXXXXXXXX', language: 'en' },
    { id: 'client2', name: 'Client 2', locationId: 'LOCATION_ID_HERE', email: 'client2@email.com', phone: '+1XXXXXXXXXX', language: 'en' },
    // Add all 10 clients here
    // { id: 'clientN', name: 'Business Name', locationId: 'xxx', email: 'xxx', phone: '+1xxx', language: 'pt' },
  ];
}

// ---- Pull data from GHL API ----
async function pullGHLData(locationId, apiKey) {
  var baseUrl = 'https://services.leadconnectorhq.com';
  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  // Date range: last 30 days
  var now = new Date();
  var thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  var startDate = thirtyDaysAgo.toISOString().split('T')[0];
  var endDate = now.toISOString().split('T')[0];

  // 1) Contacts (new leads)
  var contacts = { total: 0, sources: {} };
  try {
    var cResp = await fetch(baseUrl + '/contacts/?locationId=' + locationId + '&startAfter=' + thirtyDaysAgo.toISOString() + '&limit=100', { headers: headers });
    if (cResp.ok) {
      var cData = await cResp.json();
      var contactList = cData.contacts || [];
      contacts.total = contactList.length;
      contactList.forEach(function(c) {
        var src = c.source || c.tags?.[0] || 'Direct';
        contacts.sources[src] = (contacts.sources[src] || 0) + 1;
      });
    }
  } catch (e) { contacts.error = e.message; }

  // 2) Opportunities (pipeline)
  var opportunities = { total: 0, won: 0, lost: 0, open: 0, value: 0 };
  try {
    var oResp = await fetch(baseUrl + '/opportunities/search?location_id=' + locationId + '&limit=100', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ location_id: locationId })
    });
    if (oResp.ok) {
      var oData = await oResp.json();
      var oppList = oData.opportunities || [];
      opportunities.total = oppList.length;
      oppList.forEach(function(o) {
        if (o.status === 'won') { opportunities.won++; opportunities.value += (o.monetaryValue || 0); }
        else if (o.status === 'lost') opportunities.lost++;
        else opportunities.open++;
      });
    }
  } catch (e) { opportunities.error = e.message; }

  // 3) Conversations (messages)
  var conversations = { total: 0 };
  try {
    var convResp = await fetch(baseUrl + '/conversations/search', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ locationId: locationId, limit: 100 })
    });
    if (convResp.ok) {
      var convData = await convResp.json();
      conversations.total = (convData.conversations || []).length;
    }
  } catch (e) { conversations.error = e.message; }

  return {
    period: startDate + ' to ' + endDate,
    contacts: contacts,
    opportunities: opportunities,
    conversations: conversations
  };
}

// ---- Generate report with AI ----
async function generateReport(client, data, groqKey) {
  var prompt = `You are a marketing agency report writer for Galaxy IT & Marketing. Generate a monthly performance report for the client "${client.name}".

Write in ${client.language === 'pt' ? 'Brazilian Portuguese' : client.language === 'es' ? 'Spanish' : 'English'}.

DATA FROM LAST 30 DAYS:
- New leads/contacts: ${data.contacts.total}
- Lead sources: ${JSON.stringify(data.contacts.sources)}
- Pipeline opportunities: ${data.opportunities.total} total (${data.opportunities.won} won, ${data.opportunities.lost} lost, ${data.opportunities.open} open)
- Pipeline value (won): $${data.opportunities.value}
- Active conversations: ${data.conversations.total}
- Period: ${data.period}

REPORT FORMAT:
1. Greeting (1 sentence, friendly)
2. Key Highlights (3-4 bullet points with the most important numbers)
3. Lead Performance (where leads came from, trends)
4. Pipeline Summary (opportunities won/lost/open, value)
5. Recommendation (1-2 actionable suggestions based on the data)
6. Sign off as Galaxy IT & Marketing team

Keep it concise — max 200 words. Professional but warm. Use specific numbers.
If any data shows 0 or errors, mention "data not available for this period" instead of saying zero.`;

  var resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + groqKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.7
    })
  });

  if (!resp.ok) throw new Error('AI report generation failed');
  var aiData = await resp.json();
  return aiData.choices[0].message.content;
}

// ---- Send report via email (GHL API) ----
async function sendReportEmail(client, report, apiKey) {
  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  // Find contact by email in GHL to get contactId
  var searchResp = await fetch('https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=' + client.locationId + '&email=' + encodeURIComponent(client.email), { headers: headers });

  var contactId = null;
  if (searchResp.ok) {
    var searchData = await searchResp.json();
    contactId = searchData.contact?.id;
  }

  if (!contactId) {
    console.log('Could not find contact for ' + client.name + ', skipping email');
    return;
  }

  // Send email via GHL conversations
  var now = new Date();
  var monthName = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  await fetch('https://services.leadconnectorhq.com/conversations/messages', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      type: 'Email',
      contactId: contactId,
      subject: 'Your Monthly Performance Report — ' + monthName + ' | Galaxy IT',
      html: formatReportHTML(client, report, monthName),
      emailFrom: 'Galaxy IT & Marketing <info@galaxyinfo.us>'
    })
  });
}

// ---- Send report summary via WhatsApp (GHL API) ----
async function sendReportWhatsApp(client, report, apiKey) {
  if (!client.phone) return;

  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Version': '2021-07-28',
    'Content-Type': 'application/json'
  };

  // Find contact
  var searchResp = await fetch('https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=' + client.locationId + '&phone=' + encodeURIComponent(client.phone), { headers: headers });

  var contactId = null;
  if (searchResp.ok) {
    var searchData = await searchResp.json();
    contactId = searchData.contact?.id;
  }

  if (!contactId) return;

  // WhatsApp — short summary (WhatsApp has message limits)
  var shortReport = report.substring(0, 800);
  if (report.length > 800) shortReport += '\n\n...Full report sent to your email.';

  await fetch('https://services.leadconnectorhq.com/conversations/messages', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      type: 'WhatsApp',
      contactId: contactId,
      message: '📊 *Monthly Performance Report*\n\n' + shortReport
    })
  });
}

// ---- HTML email template ----
function formatReportHTML(client, report, monthName) {
  var reportHtml = report.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<em>$1</em>');

  return '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">'
    + '<div style="background:linear-gradient(135deg,#0d1b2a,#1a237e);padding:30px;border-radius:12px 12px 0 0;text-align:center;">'
    + '<h1 style="color:#ffd700;margin:0;font-size:22px;">Galaxy IT & Marketing</h1>'
    + '<p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Monthly Performance Report — ' + monthName + '</p>'
    + '</div>'
    + '<div style="background:#fff;padding:30px;border:1px solid #e5e5e5;border-top:none;">'
    + '<p style="font-size:14px;line-height:1.8;">' + reportHtml + '</p>'
    + '</div>'
    + '<div style="background:#f5f5f5;padding:20px;border-radius:0 0 12px 12px;text-align:center;border:1px solid #e5e5e5;border-top:none;">'
    + '<p style="margin:0;font-size:12px;color:#888;">Questions about your report? <a href="https://galaxyinfo.us/support" style="color:#1a237e;">Visit our Help Center</a> or reply to this email.</p>'
    + '<p style="margin:8px 0 0;font-size:11px;color:#aaa;">&copy; 2026 Galaxy IT & Marketing · Worcester, MA</p>'
    + '</div>'
    + '</body></html>';
}
