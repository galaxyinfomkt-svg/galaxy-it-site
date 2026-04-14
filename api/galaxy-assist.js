// Galaxy Assist — Vercel Serverless Function
// Tries Groq (free) first, falls back to Anthropic

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var body = req.body || {};
  var message = body.message;
  var systemPrompt = body.systemPrompt || '';
  var history = body.history;

  if (!message) return res.status(400).json({ error: 'Message required' });

  // Build messages
  var messages = [];
  try {
    var parsed = typeof history === 'string' ? JSON.parse(history) : (history || []);
    if (Array.isArray(parsed)) {
      for (var i = 0; i < parsed.length; i++) {
        messages.push({
          role: parsed[i].role === 'assistant' ? 'assistant' : 'user',
          content: String(parsed[i].content)
        });
      }
    }
  } catch (e) {}
  messages.push({ role: 'user', content: message });

  // 1) Try Groq (free, fast)
  var groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      var groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + groqKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: systemPrompt }].concat(messages),
          max_tokens: 1024,
          temperature: 0.7
        })
      });

      if (groqResp.ok) {
        var groqData = await groqResp.json();
        var groqText = groqData.choices && groqData.choices[0] && groqData.choices[0].message && groqData.choices[0].message.content;
        if (groqText) return res.status(200).json({ text: groqText });
      }
    } catch (e) {
      console.error('Groq error:', e.message);
    }
  }

  // 2) Fallback to Anthropic (paid)
  var anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      var antResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt,
          messages: messages
        })
      });

      if (antResp.ok) {
        var antData = await antResp.json();
        var antText = (antData.content && antData.content[0] && antData.content[0].text) || '';
        if (antText) return res.status(200).json({ text: antText });
      }
    } catch (e) {
      console.error('Anthropic error:', e.message);
    }
  }

  // No API key configured or both failed
  return res.status(502).json({ error: 'AI unavailable' });
};
