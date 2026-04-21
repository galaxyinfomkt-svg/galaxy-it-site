const GROQ_KEY = 'YOUR_GROQ_API_KEY';
const TEST_EMAIL = 'galaxyinfomkt@gmail.com';

const clients = [
  { name: 'Alfa Construction Inc.', ghlKey: 'YOUR_GHL_KEY', site: 'https://www.alfapaintingcarpentry.com/' },
  { name: 'Wolfs Siding Inc', ghlKey: 'YOUR_GHL_KEY', site: 'https://wolfs-siding.com/' },
  { name: 'RS Development Group', ghlKey: 'YOUR_GHL_KEY', site: 'https://rs-developmentgroup.com/' },
  { name: 'Mass HVAC', ghlKey: 'YOUR_GHL_KEY', site: 'https://masshvac.net/' },
  { name: 'Maia Construction Inc', ghlKey: 'YOUR_GHL_KEY', site: 'https://maiaconstruction.com/' },
  { name: 'JH Painting Services', ghlKey: 'YOUR_GHL_KEY', site: 'https://jhpaintingservices.com/' },
  { name: 'Dorys Cleaning Services', ghlKey: 'YOUR_GHL_KEY', site: 'https://doryscleaningservices.com/' }
];

async function pullData(client) {
  const h = { Authorization: 'Bearer ' + client.ghlKey };
  const [c, p] = await Promise.all([
    fetch('https://rest.gohighlevel.com/v1/contacts/?limit=100', { headers: h }).then(r => r.json()),
    fetch('https://rest.gohighlevel.com/v1/pipelines/', { headers: h }).then(r => r.json())
  ]);
  const contacts = c.contacts || [];
  const sources = {};
  contacts.forEach(x => { const s = x.source || x.tags?.[0] || 'Direct'; sources[s] = (sources[s] || 0) + 1; });
  const topSources = Object.entries(sources).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => k + ': ' + v).join(', ') || 'No sources';
  const pipelines = (p.pipelines || []).map(x => x.name + ' (' + x.stages.length + ' stages)').join(', ') || 'No pipelines';
  const now = new Date();
  const thirtyAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return {
    ...client,
    totalContacts: contacts.length,
    topSources,
    pipelines,
    monthName: now.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    period: thirtyAgo.toISOString().split('T')[0] + ' to ' + now.toISOString().split('T')[0]
  };
}

async function aiReport(data) {
  const prompt = 'You are a marketing report writer for Galaxy IT & Marketing. Write a monthly performance report for ' + data.name + '.\n\nDATA (' + data.period + '):\n- Contacts in CRM: ' + data.totalContacts + '\n- Lead sources (top): ' + data.topSources + '\n- Pipelines: ' + data.pipelines + '\n- Website: ' + data.site + '\n\nRULES:\n- Start with "Hi ' + data.name + ',"\n- Key Highlights: 3-4 bullet points with specific numbers\n- Lead Analysis: which sources work, which need attention\n- One specific recommendation\n- End with "Best regards, Galaxy IT & Marketing team"\n- Max 200 words\n- Professional but friendly';

  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + GROQ_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.7
    })
  });
  const j = await r.json();
  return j.choices[0].message.content;
}

function buildHtml(data, report) {
  const rHtml = report.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  return '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;background:#f5f5f5;"><div style="background:linear-gradient(135deg,#0d1b2a,#1a237e);padding:30px;border-radius:12px 12px 0 0;text-align:center;"><h1 style="color:#ffd700;margin:0;font-size:22px;">Galaxy IT &amp; Marketing</h1><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Monthly Performance Report — ' + data.monthName + '</p><p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:12px;">Client: ' + data.name + '</p></div><div style="background:#fff;padding:30px;border:1px solid #e5e5e5;border-top:none;"><div style="text-align:center;background:#f8f9fa;padding:14px;border-radius:8px;border-top:3px solid #ffd700;margin-bottom:20px;"><div style="font-size:28px;font-weight:800;color:#1a237e;">' + data.totalContacts + '</div><div style="font-size:11px;color:#888;">Total Contacts in CRM</div></div><p style="font-size:14px;line-height:1.8;">' + rHtml + '</p></div><div style="background:#f8f9fa;padding:20px;border-radius:0 0 12px 12px;text-align:center;border:1px solid #e5e5e5;border-top:none;"><p style="margin:0;font-size:12px;color:#888;">Questions? <a href="https://galaxyinfo.us/support" style="color:#1a237e;font-weight:600;">Visit Help Center</a></p><p style="margin:8px 0 0;font-size:11px;color:#aaa;">&copy; 2026 Galaxy IT &amp; Marketing · Worcester, MA</p></div></body></html>';
}

async function sendEmail(client, html, data) {
  const h = { Authorization: 'Bearer ' + client.ghlKey, 'Content-Type': 'application/json' };

  // Lookup contact
  let contactId = null;
  const lookup = await fetch('https://rest.gohighlevel.com/v1/contacts/lookup?email=' + encodeURIComponent(TEST_EMAIL), { headers: h });
  const lj = await lookup.json();
  if (lj.contacts && lj.contacts[0]) contactId = lj.contacts[0].id;

  // Create if not exists
  if (!contactId) {
    const create = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: h,
      body: JSON.stringify({
        firstName: 'Galaxy IT',
        lastName: 'Team',
        email: TEST_EMAIL,
        tags: ['test-report']
      })
    });
    const cj = await create.json();
    contactId = cj.contact?.id;
  }

  if (!contactId) return { error: 'Could not get contact ID' };

  const send = await fetch('https://rest.gohighlevel.com/v1/conversations/messages', {
    method: 'POST',
    headers: h,
    body: JSON.stringify({
      type: 'Email',
      contactId,
      subject: '[TEST] Monthly Report — ' + data.name + ' — ' + data.monthName,
      html
    })
  });
  return await send.json();
}

(async () => {
  for (const client of clients) {
    try {
      console.log('\n=== ' + client.name + ' ===');
      const data = await pullData(client);
      console.log('  Contacts: ' + data.totalContacts + ' | Sources: ' + data.topSources);
      const report = await aiReport(data);
      console.log('  Report: ' + report.length + ' chars');
      const html = buildHtml(data, report);
      const result = await sendEmail(client, html, data);
      if (result.error || result.msg) console.log('  SEND ERROR: ' + JSON.stringify(result).substring(0, 200));
      else console.log('  ✓ SENT TO ' + TEST_EMAIL);
    } catch (e) {
      console.log('  FAILED: ' + e.message);
    }
  }
})();
