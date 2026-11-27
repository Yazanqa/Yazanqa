// Minimal OpenRouter chat completion.
// Run: OPENROUTER_API_KEY=sk-or-... node openrouter.mjs "your question"
//  or: node --env-file=.env openrouter.mjs "your question"

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
