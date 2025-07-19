import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { supabase } from "../lib/supabase";
const app = express();
app.use(cors());
app.use(express.json());
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const { data: profile, error } = await supabase.from("profile").select("*");
    if (error || !profile) {
      return res.status(500).json({ error: error.message });
    }
    const systemMessage = {
      role: "system",
      content: `You are an AI assistant for Victor. Here is Victor's profile: ${JSON.stringify(
        profile
      )}. Always use this information to answer questions about Victor.`,
    };
    const userMessage = {
      role: "user",
      content: message,
    };
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [systemMessage, userMessage],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );
    const text = groqRes.data.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    res.status(500).json({
      error:
        err instanceof Error ? err.message : "Failed to connect to the server",
    });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
