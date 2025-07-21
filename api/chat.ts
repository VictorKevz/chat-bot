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

    // Analyze user intent to determine which data to fetch
    const messageText = message.toLowerCase();
    const isAboutWork =
      /work|job|experience|company|employment|career|project/.test(messageText);
    const isAboutEducation =
      /education|school|university|college|degree|study|academic/.test(
        messageText
      );
    const isGeneralQuestion =
      /hi|about|who|background|summary|overview|tell me/.test(messageText);

    const queries = [
      { key: "profile", query: supabase.from("profile").select("*") },
    ];

    // Add relevant tables based on user intent
    if (isAboutWork || isGeneralQuestion) {
      queries.push({
        key: "experience",
        query: supabase.from("experience").select("*"),
      });
    }
    if (isAboutEducation || isGeneralQuestion) {
      queries.push({
        key: "education",
        query: supabase.from("education").select("*"),
      });
    }

    // Execute queries in parallel
    const results = await Promise.all(queries.map((q) => q.query));

    // Check for errors
    const hasError = results.some((result) => result.error);
    if (hasError) {
      const errors = results.filter((r) => r.error).map((r) => r.error);
      console.error("Supabase errors:", errors);
      return res.status(500).json({
        error: "Failed to fetch data from database",
        details: errors,
      });
    }

    // Build profile data object with only fetched tables
    const profileData: any = {};
    queries.forEach((q, index) => {
      profileData[q.key] = results[index].data;
    });

    // Prepare messages for Groq API
    const systemMessage = {
      role: "system",
      content: `You are an AI assistant for Victor and your user name is VCTR. Here is Victor's complete data: ${JSON.stringify(
        profileData
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
          model: "llama-3.3-70b-versatile",
          messages: [systemMessage, userMessage],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errorText);
      throw new Error(`Groq API error: ${groqResponse.status} - ${errorText}`);
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
