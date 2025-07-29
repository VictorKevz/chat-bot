import type { VercelRequest, VercelResponse } from "@vercel/node";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Groq API key not configured",
      });
    }

    // Initialize the Groq client
    const groq = new Groq({
      apiKey: apiKey,
    });

    const { action, audioData } = req.body;

    switch (action) {
      case "transcribe": {
        try {
          if (!audioData) {
            return res.status(400).json({
              success: false,
              error: "No audio data provided",
            });
          }

          const audioBuffer = Buffer.from(audioData, "base64");

          const tempDir = "/tmp";
          const tempFilePath = path.join(tempDir, `audio_${Date.now()}.wav`);

          await writeFile(tempFilePath, audioBuffer);

          try {
            const transcription = await groq.audio.transcriptions.create({
              file: fs.createReadStream(tempFilePath),
              model: "whisper-large-v3-turbo",
              language: "en",
              temperature: 0.0,
              response_format: "text",
            });

            fs.unlinkSync(tempFilePath);

            return res.status(200).json({
              success: true,
              transcript: transcription,
              message: "Transcription completed with official Groq SDK",
            });
          } catch (groqError) {
            // Clean up temp file on error
            try {
              fs.unlinkSync(tempFilePath);
            } catch (cleanupError) {
              console.error("Failed to cleanup temp file:", cleanupError);
            }
            throw groqError;
          }
        } catch (transcribeError) {
          console.error("Transcription error:", transcribeError);
          return res.status(500).json({
            success: false,
            error: "Failed to transcribe audio",
            details:
              transcribeError instanceof Error
                ? transcribeError.message
                : "Unknown transcription error",
          });
        }
      }

      case "test": {
        return res.status(200).json({
          success: true,
          message: "API route working with Groq AI SDK",
          hasApiKey: !!apiKey,
        });
      }

      default: {
        return res.status(400).json({
          error: "Invalid action. Use 'transcribe' or 'test'",
        });
      }
    }
  } catch (error) {
    console.error("Speech API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
