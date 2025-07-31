import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@deepgram/sdk";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { message } = req.body;

  try {
    if (!message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
    const response = await deepgram.speak.request(
      { text: message },
      {
        model: "aura-2-hermes-en",
        encoding: "linear16",
        container: "wav",
      }
    );

    // Get the audio stream from the response
    const stream = await response.getStream();
    if (!stream) {
      return res.status(500).json({ error: "Error generating audio" });
    }

    // Helper to convert stream to buffer
    const getAudioBuffer = async (stream: ReadableStream) => {
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      const dataArray = chunks.reduce(
        (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
        new Uint8Array(0)
      );
      return Buffer.from(dataArray.buffer);
    };

    const buffer = await getAudioBuffer(stream);
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
