import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, chatHistory, category } = req.body;

    const categories = [
      "projects",
      "experience",
      "education",
      "personal",
      "profile",
    ];
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    let profileData: any = {};
    // This whole logic to fetch data is based on two conditions:

    // 1. User clicks one of the questions in the FAQS - L41:
    //- By clicking the questions from the FAQS, we also get the category key eg "projects"
    // - We then use this category key to fetch data from the DB that matches this category.

    //2. User has entered the input manually - L65:
    //- When the user manually enters the input, we don't know for sure what the question is.
    //- To understand it we set these checks in the ELSE statement to predict their intention.

    if (category && category.trim() !== "") {
      // FAQ question with category - fetch specific table + profile
      const [profileResult, categoryResult] = await Promise.all([
        supabase.from("profile").select("*"),
        supabase.from(category).select("*"),
      ]);

      // Check for errors
      if (profileResult.error || categoryResult.error) {
        const errors = [profileResult.error, categoryResult.error].filter(
          Boolean
        );
        console.error("Supabase errors:", errors);
        return res.status(500).json({
          error: "Failed to fetch data from database",
          details: errors,
        });
      }

      // Direct assignment - no need for complex mapping
      profileData = {
        profile: profileResult.data,
        [category]: categoryResult.data,
      };
    } else {
      // User-entered question - analyze intent and fetch relevant tables
      const messageText = message.toLowerCase();

      // Helper function to determine what tables to fetch based on user input
      const getRelevantTables = (text: string): string[] => {
        const tablesToFetch = ["profile"]; // Always include profile

        // Check for direct category keywords first
        const matchedCategory = categories.find((cat) =>
          text.includes(cat.toLowerCase())
        );

        if (matchedCategory) {
          tablesToFetch.push(matchedCategory);
          return tablesToFetch;
        }

        // Intent-based detection patterns
        const patterns = {
          work: /work|job|experience|company|employment|career|project/,
          education:
            /education|school|university|college|degree|study|academic/,
          general:
            /hi|hello|about|who|background|summary|overview|tell me|languages/,
          personal:
            /hobbies|interests|fun|pets|travel|music|sports|food|personal|hobby/,
        };

        const isAboutWork = patterns.work.test(text);
        const isAboutEducation = patterns.education.test(text);
        const isGeneralQuestion = patterns.general.test(text);
        const isAboutPersonal = patterns.personal.test(text);

        // Add relevant tables based on intent
        if (isAboutWork || isGeneralQuestion) {
          tablesToFetch.push("experience");
        }

        if (isAboutEducation || isGeneralQuestion) {
          tablesToFetch.push("education");
        }

        if (isAboutPersonal || isGeneralQuestion) {
          tablesToFetch.push("personal");
        }

        return tablesToFetch;
      };

      // Get the tables we need to fetch
      const tablesToFetch = getRelevantTables(messageText);

      // Build queries for each table
      const queries = tablesToFetch.map((table) => ({
        key: table,
        query: supabase.from(table).select("*"),
      }));

      // Execute all queries
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

      // Build profile data object
      queries.forEach((q, index) => {
        profileData[q.key] = results[index].data;
      });
    }

    // Prepare messages for Groq API
    let systemContent = "";

    if (category && category.trim() !== "") {
      // FAQ-driven: We know exactly what data we have
      systemContent = `You are an AI assistant for Victor and your user name is VCTR. Here's Victor's profile: ${JSON.stringify(
        profileData.profile
      )}. Here's relevant ${category} data: ${JSON.stringify(
        profileData[category]
      )}. Answer questions about Victor using this information. Do not respond with statements like "Based on..., According to... etc. Instead just answer directly without indicating any source. Remember to always keep your responses concise unless explicitly asked to provide more details and explanations. Use a friendly tone. Always format links with https like his website, linked, github etc."`;
    } else {
      // Intent-driven: Use the complete structured data
      systemContent = `You are an AI assistant for Victor and your user name is VCTR. Here is Victor's complete data: ${JSON.stringify(
        profileData
      )}. Answer questions about Victor using this information. Do not respond with statements like "Based on..., According to... etc. Instead just answer directly without indicating any source. Remember to always keep your responses concise unless explicitly asked to provide more details and explanations. Use a friendly tone. Always format links with https like his website, linked, github etc."`;
    }

    const systemMessage = {
      role: "system",
      content: systemContent,
    };

    // Convert chat history to Groq format and include current message
    const conversationMessages: Array<{ role: string; content: string }> = [];

    if (chatHistory && Array.isArray(chatHistory)) {
      // No role transformation needed - frontend now uses Groq format
      conversationMessages.push(
        ...chatHistory.map((msg: any) => ({
          role: msg.role, // Direct assignment - no conversion needed
          content: msg.content,
        }))
      );
    } else {
      // Fallback: just add the current message if no history
      conversationMessages.push({
        role: "user",
        content: message,
      });
    }

    // Combine system message with conversation history
    const allMessages = [systemMessage, ...conversationMessages];

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
          messages: allMessages,
          max_tokens: 1000,
          temperature: 0.9,
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
