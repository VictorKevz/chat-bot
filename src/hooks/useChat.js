import { useState } from "react";
export const useChat = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatLog, setChatLog] = useState([
        { role: "user", content: "Hello there!" },
        { role: "ai", content: "Hi! How can I help you today?" },
    ]);
    const chat = async (message) => {
        try {
            setLoading(true);
            setError(null);
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
            const res = await fetch(`${API_BASE_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            if (!res.ok)
                throw new Error("API error");
            const data = await res.json();
            setChatLog((prev) => [
                ...prev,
                { role: "user", content: message },
                { role: "ai", content: data.text },
            ]);
            return data.text;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        }
        finally {
            setLoading(false);
        }
    };
    return { chat, loading, error, chatLog };
};
