// Minimal OpenRouter chat completion.
// Run: OPENROUTER_API_KEY=sk-or-... node openrouter.mjs "your question"
//  or: node --env-file=.env openrouter.mjs "your question"
// Optional: OPENROUTER_SITE_URL and OPENROUTER_SITE_NAME are sent as the
// HTTP-Referer and X-Title headers (used for OpenRouter app rankings).

if (!process.env.OPENROUTER_API_KEY) {
  console.error('Set OPENROUTER_API_KEY first.');
  process.exit(1);
}

const prompt = process.argv.slice(2).join(' ') || 'What is the meaning of life?';

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    ...(process.env.OPENROUTER_SITE_URL && { 'HTTP-Referer': process.env.OPENROUTER_SITE_URL }),
    ...(process.env.OPENROUTER_SITE_NAME && { 'X-Title': process.env.OPENROUTER_SITE_NAME }),
  },
  body: JSON.stringify({
    model: 'openai/gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  }),
});

const data = await res.json();
if (!res.ok) {
  console.error(`HTTP ${res.status}:`, data);
  process.exit(1);
}
console.log(data.choices?.[0]?.message?.content ?? data);
