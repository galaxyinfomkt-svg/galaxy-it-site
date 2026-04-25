// Galaxy Assist — Vercel Serverless Function
// Primary: Claude Sonnet with live web_search restricted to GHL docs
// Fallback: Groq (free, fast, no live search)

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

  // Build conversation messages
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

  // 1) PRIMARY: Claude Sonnet with web_search restricted to GHL docs
  var anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      var searchAugmentedPrompt = systemPrompt + '\n\n==============================================\nLIVE DOCUMENTATION ACCESS\n==============================================\nYou have access to a web_search tool. USE IT whenever the question is about a GHL feature, setup step, troubleshooting, or anything where the answer might be in the official documentation. Search queries should include terms like "GoHighLevel" or "highlevel" to land on official docs. Prefer results from gohighlevel.com, help.gohighlevel.com, support.gohighlevel.com, ideas.gohighlevel.com, marketplace.gohighlevel.com.\n\nWhen you find an answer in the docs, write it naturally in the user\'s language (do not just paste raw search results). Cite the source URL at the end as "Fonte: <URL>" / "Source: <URL>" / "Fuente: <URL>".\n\nDo NOT search for: greetings, password help, basic FAQ that you already know from the reference above.';

      var antResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1500,
          system: searchAugmentedPrompt,
          messages: messages,
          tools: [{
            type: 'web_search_20250305',
            name: 'web_search',
            max_uses: 3,
            allowed_domains: [
              'gohighlevel.com',
              'help.gohighlevel.com',
              'support.gohighlevel.com',
              'ideas.gohighlevel.com',
              'marketplace.gohighlevel.com',
              'highlevel.com'
            ]
          }]
        })
      });

      if (antResp.ok) {
        var antData = await antResp.json();
        // Extract text from any text blocks (search-augmented responses can have multiple blocks)
        var antText = '';
        if (antData.content && Array.isArray(antData.content)) {
          for (var j = 0; j < antData.content.length; j++) {
            if (antData.content[j].type === 'text' && antData.content[j].text) {
              antText += antData.content[j].text;
            }
          }
        }
        if (antText) return res.status(200).json({ text: antText });
      } else {
        var errBody = await antResp.text();
        console.error('Anthropic non-OK:', antResp.status, errBody.substring(0, 200));
      }
    } catch (e) {
      console.error('Anthropic error:', e.message);
    }
  }

  // 2) FALLBACK: Groq (no live search, but fast and free)
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

  return res.status(502).json({ error: 'AI unavailable' });
};
