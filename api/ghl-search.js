// Galaxy Assist — GHL Documentation Search
// Searches GoHighLevel support articles when local KB doesn't have the answer

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    var query = (req.body.query || '').trim();
    var language = req.body.language || 'en';

    if (!query) return res.status(400).json({ error: 'Query required' });

    try {
        // Search GHL support docs via their public search
        var searchUrl = 'https://support.gohighlevel.com/search?q=' + encodeURIComponent(query + ' GoHighLevel');

        // Use Google Custom Search as fallback (no API key needed for basic scraping)
        var googleUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query + ' site:support.gohighlevel.com OR site:help.gohighlevel.com') + '&num=3';

        var response = await fetch(googleUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; GalaxyAssist/1.0)',
                'Accept': 'text/html'
            }
        });

        if (!response.ok) {
            return res.status(200).json({
                text: null,
                searchUrl: 'https://support.gohighlevel.com/search?q=' + encodeURIComponent(query)
            });
        }

        var html = await response.text();

        // Extract snippets from Google results
        var snippets = [];
        var snippetRegex = /<span class="(?:st|aCOpRe)"[^>]*>([\s\S]*?)<\/span>/gi;
        var match;
        while ((match = snippetRegex.exec(html)) !== null && snippets.length < 3) {
            var clean = match[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
            if (clean.length > 30) snippets.push(clean);
        }

        // Extract titles and URLs
        var links = [];
        var linkRegex = /<a href="\/url\?q=(https?:\/\/(?:support|help)\.gohighlevel\.com[^&"]+)/gi;
        while ((match = linkRegex.exec(html)) !== null && links.length < 3) {
            links.push(decodeURIComponent(match[1]));
        }

        if (snippets.length > 0 || links.length > 0) {
            // Build a natural answer from the snippets
            var answerParts = [];
            if (snippets.length > 0) {
                answerParts.push(snippets.join(' '));
            }

            var langLabels = {
                en: { found: "Here's what I found from the Bee Pro Hub documentation:", more: "More details:" },
                es: { found: "Esto es lo que encontré en la documentación de Bee Pro Hub:", more: "Más detalles:" },
                pt: { found: "Aqui está o que encontrei na documentação do Bee Pro Hub:", more: "Mais detalhes:" }
            };
            var labels = langLabels[language] || langLabels.en;

            var result = labels.found + '<br><br>' + answerParts.join('<br><br>');

            if (links.length > 0) {
                result += '<br><br>' + labels.more + '<br>';
                links.forEach(function(link) {
                    result += '• <a href="' + link + '" target="_blank">' + link.replace('https://', '').substring(0, 60) + '</a><br>';
                });
            }

            return res.status(200).json({ text: result });
        }

        // Nothing found
        return res.status(200).json({
            text: null,
            searchUrl: 'https://support.gohighlevel.com/search?q=' + encodeURIComponent(query)
        });

    } catch (err) {
        console.error('GHL search error:', err.message);
        return res.status(200).json({ text: null });
    }
};
