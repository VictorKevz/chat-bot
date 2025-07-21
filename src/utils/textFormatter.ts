export const parseTextWithLinks = (text: string) => {
  // Create a combined regex to find all clickable items
  const combinedRegex =
    /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+?[\d]{1,3}[\d\s\-\(\)]{8,})/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({
        type: "text" as const,
        text: text.slice(lastIndex, match.index),
      });
    }

    // Determine the type and create the link
    const matchedText = match[0];
    let href = "";

    if (match[1]) {
      // URL (first capture group)
      href = matchedText;
    } else if (match[2]) {
      // Email (second capture group)
      href = `mailto:${matchedText}`;
    } else if (match[3]) {
      // Phone (third capture group)
      href = `tel:${matchedText.replace(/[\s\-\(\)]/g, "")}`;
    }

    parts.push({
      type: "link" as const,
      text: matchedText,
      href: href,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: "text" as const,
      text: text.slice(lastIndex),
    });
  }

  return parts.filter((part) => part.text); // Remove empty parts
};
