import type { VercelRequest } from "@vercel/node";

export type IntentResult = {
  intent: string | null;
  confidence: number;
  source: "llm";
};

export type ProjectPaging = {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type ProjectUiAction = {
  type: "show_projects";
  items: unknown[];
  paging: ProjectPaging;
};

export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";
export const DEFAULT_INTENT_MODEL = "llama-3.1-8b-instant";
export const DEFAULT_CHAT_MODEL_FAST = "llama-3.1-8b-instant";
export const DEFAULT_CHAT_MODEL_STRONG = "llama-3.3-70b-versatile";
export const DEFAULT_PROJECT_PAGE_SIZE = 2;

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 30;

const faqIntents = [
  {
    title: "Projects",
    category: "projects",
    questions: [
      "What are some of Victor's personal projects?",
      "Where can I see his portfolio?",
      "What tech stack does he use for his projects?",
      "Which project is he most proud of?",
      "How does he come up with project ideas?",
    ],
  },
  {
    title: "Experience",
    category: "experience",
    questions: [
      "Tell me about Victor's work experience.",
      "What was his most challenging project?",
      "What is his role currently?",
      "How many years of experience does he have?",
      "What kind of teams has he worked with?",
    ],
  },
  {
    title: "Education",
    category: "education",
    questions: [
      "Where did Victor study?",
      "What was his major?",
      "What was his graduation year?",
      "Any relevant certifications?",
    ],
  },
  {
    title: "Personal",
    category: "personal",
    questions: [
      "What does Victor do for fun?",
      "Any fun facts about him?",
      "Does he have any pets?",
      "What kind of food does he like?",
    ],
  },
];

export const intentCategories = faqIntents.map((item) => item.category);

export const projectToolSchema = [
  {
    type: "function",
    function: {
      name: "show_projects",
      description:
        "Fetch a small page of Victor's projects for the UI. Use this when the user asks about projects or wants to see the next project.",
      parameters: {
        type: "object",
        properties: {
          offset: {
            type: "integer",
            description: "Starting index for projects (0-based).",
          },
          limit: {
            type: "integer",
            description: "Number of projects to return (1-2).",
          },
        },
        required: ["offset", "limit"],
      },
    },
  },
];

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (req: VercelRequest) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim() !== "") {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0] ?? "unknown";
  }
  if (typeof req.socket?.remoteAddress === "string") {
    return req.socket.remoteAddress;
  }
  return "unknown";
};

export const applyRateLimit = (req: VercelRequest) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    const next = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitStore.set(ip, next);
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt: next.resetAt,
    };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  const updated = { ...existing, count: existing.count + 1 };
  rateLimitStore.set(ip, updated);
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - updated.count,
    resetAt: updated.resetAt,
  };
};

const extractJsonObject = (content: string) => {
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  return content.slice(start, end + 1);
};

export const resolveIntentWithLlm = async ({
  text,
  apiKey,
  intentModel,
}: {
  text: string;
  apiKey: string;
  intentModel: string;
}): Promise<IntentResult> => {
  const fallbackPrompt = `Classify the user message into one of: projects, experience, education, personal, general.\nReturn ONLY valid JSON with keys intent and confidence (0-1).\nMessage: "${text}"`;

  const response = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: intentModel,
      messages: [
        { role: "system", content: "Return JSON only." },
        { role: "user", content: fallbackPrompt },
      ],
      max_tokens: 120,
      temperature: 0.0,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Intent fallback error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content ?? "";

  try {
    const jsonPayload = extractJsonObject(content) ?? content;
    const parsed = JSON.parse(jsonPayload);
    const intent =
      typeof parsed.intent === "string"
        ? parsed.intent.toLowerCase()
        : "general";
    const confidence =
      typeof parsed.confidence === "number" ? parsed.confidence : 0.5;

    return { intent, confidence, source: "llm" };
  } catch (error) {
    console.warn("Intent fallback JSON parse failed:", error);
  }

  return { intent: "general", confidence: 0.3, source: "llm" };
};

const parseYearValue = (value: unknown) => {
  if (typeof value === "number" && value >= 1900) {
    return value;
  }

  if (typeof value === "string") {
    const match = value.match(/(19|20)\d{2}/);
    if (match) {
      return Number(match[0]);
    }
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.getUTCFullYear();
    }
  }

  return null;
};

export const deriveEducationDateContext = (
  educationData: Array<Record<string, unknown>> | null,
  currentDate: Date,
) => {
  if (!educationData || educationData.length === 0) {
    return "Education date data not available.";
  }

  const endYears: number[] = [];
  const startYears: number[] = [];

  educationData.forEach((entry) => {
    Object.entries(entry).forEach(([key, value]) => {
      const year = parseYearValue(value);
      if (!year) {
        return;
      }
      const lowerKey = key.toLowerCase();
      if (lowerKey.includes("end") || lowerKey.includes("graduation")) {
        endYears.push(year);
      } else if (lowerKey.includes("start")) {
        startYears.push(year);
      }
    });
  });

  const mostRecentYear = Math.max(
    ...(endYears.length > 0 ? endYears : startYears),
  );

  if (!Number.isFinite(mostRecentYear)) {
    return "Education date data available but no parsable years found.";
  }

  const yearsSince = currentDate.getUTCFullYear() - mostRecentYear;
  return `Most recent education year: ${mostRecentYear}. Years since: ${yearsSince}.`;
};
