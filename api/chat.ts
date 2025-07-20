import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    // Get profile data from Supabase
    const { data: profile, error } = await supabase.from("profile").select("*");

    if (error || !profile) {
      return res
        .status(500)
        .json({ error: error?.message || "Failed to fetch profile" });
    }

    // Prepare messages for Groq API
    const systemMessage = {
      role: "system",
      content: `You are an AI assistant for Victor and your user name is VCTR. Here is Victor's profile: ${JSON.stringify(
        profile
      )}. Always use this information to answer questions about Victor. Do not respond with statements like "Based on..., According to... etc. Instead just answer directly without indicating any source. Remember to always keep your responses concise unless explicitly asked to provide more details and explanations. Use a friendly tone when greeted."`,
    };

    const userMessage = {
      role: "user",
      content: message,
    };

    // Call Groq API
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [systemMessage, userMessage],
        }),
      }
    );

    if (!groqResponse.ok) {
      throw new Error(`Groq API error: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const text = groqData.choices[0].message.content;

    res.json({ text });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to connect to the server",
    });
  }
}
