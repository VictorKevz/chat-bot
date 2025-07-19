const { google } = require("@ai-sdk/google");
const { generateText } = require("ai");
const supabase = require("../lib/supabase.cjs");

module.exports = async function handler(req) {
  const { message } = await req.json();

  const { data: profile, error } = await supabase.from("profile").select("*");
  if (error || !profile) {
    console.error("Supabase fetch error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = [
    {
      role: "system",
      content: `This is the user's profile: ${JSON.stringify(
        profile
      )}. Use this context when responding.`,
    },
    {
      role: "user",
      content: message,
    },
  ];

  const model = google("models/gemini-1.5-pro-latest");
  const { text } = await generateText({ model, messages });

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
};
