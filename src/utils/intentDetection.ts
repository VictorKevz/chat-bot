/**
 * Detects if a user message is asking about projects/portfolio
 * Uses conservative keyword matching for high accuracy
 */
export const detectProjectIntent = (message: string): boolean => {
  const normalizedMessage = message.toLowerCase().trim();

  // Primary project keywords
  const projectKeywords = [
    "projects",
    "portfolio",
    "project",
    "built",
    "created",
    "developed",
    "coding",
    "programming",
    "websites",
    "apps",
    "applications",
  ];

  // Action verbs that indicate wanting to see/know about projects
  const actionVerbs = [
    "show",
    "see",
    "view",
    "tell",
    "describe",
    "explain",
    "what",
    "which",
    "display",
    "list",
  ];

  // Common project-related phrases
  const projectPhrases = [
    "what have you built",
    "show me your work",
    "your projects",
    "what projects",
    "portfolio items",
    "things you made",
    "stuff you built",
    "your coding work",
    "programming projects",
    "development work",
    "recent work",
    "latest projects",
  ];

  // Check for exact phrase matches first (highest confidence)
  const hasProjectPhrase = projectPhrases.some((phrase) =>
    normalizedMessage.includes(phrase)
  );

  if (hasProjectPhrase) {
    return true;
  }

  // Check for keyword + action verb combination
  const hasProjectKeyword = projectKeywords.some((keyword) =>
    normalizedMessage.includes(keyword)
  );

  const hasActionVerb = actionVerbs.some((verb) =>
    normalizedMessage.includes(verb)
  );

  // Both must be present for keyword approach
  if (hasProjectKeyword && hasActionVerb) {
    return true;
  }

  // Special case: single word "projects" or "portfolio"
  if (normalizedMessage === "projects" || normalizedMessage === "portfolio") {
    return true;
  }

  return false;
};
