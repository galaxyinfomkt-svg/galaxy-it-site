// Galaxy Assist — Vercel Serverless Function
// Receives chat messages and responds via Claude API

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var body = req.body || {};
  var message = body.message;
  var language = body.language || 'en';
  var systemPrompt = body.systemPrompt || 'You are Galaxy Assist, an AI support agent. Be helpful and concise.';
  var history = body.history;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  var apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Build messages array from history
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
  } catch (e) {
    // Ignore history parse errors
  }

  // Add current message
  messages.push({ role: 'user', content: message });

  try {
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
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

    if (!response.ok) {
      var errText = await response.text();
      console.error('Claude API error:', response.status, errText);
      return res.status(502).json({ error: 'AI error', detail: errText });
    }

    var data = await response.json();
    var text = (data.content && data.content[0] && data.content[0].text) || '';

    return res.status(200).json({ text: text });

  } catch (err) {
    console.error('Request failed:', err.message);
    return res.status(502).json({ error: 'AI unavailable', detail: err.message });
  }
};
