import { useState } from "react";

export const useTextToSpeech = () => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAudio = async (text: string) => {
    try {
      setLoading(true);
      setError(null);
      if (!text.trim()) {
        setLoading(false);
        setError("Text is required!");
        return;
      }
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const audioFile = await res.json();
      setData(audioFile?.audio);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getAudio };
};
