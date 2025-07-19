import { google } from "@ai-sdk/google";
import { CoreMessage, generateText } from "ai";
import supabase from "../lib/supabase";

export default async function handler(req: Request): Promise<Response> {
  const { message } = await req.json();

  const { data: profile, error } = await supabase.from("profile").select("*");
  if (error || !profile) {
    console.error("Supabase fetch error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages: CoreMessage[] = [
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
}
