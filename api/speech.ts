import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { message } = req.body;

  try {
    if (!message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const url = "https://api.deepgram.com/v1/speak?model=aura-2-athena-en";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }
    // Deepgram REST API returns audio as binary
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");
    res.json({ audio: base64Audio });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({
      error:
        err instanceof Error ? err.message : "Failed to connect to the server",
    });
  }
}
