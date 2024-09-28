const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.query;
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const results = data.query.search.map(result => ({
      title: result.title,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`,
      snippet: result.snippet
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(results)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to search Wikipedia' })
    };
  }
};
