export const replaceLinks = (text: string) => {
  return text
    .replace(/https:\/\/victorkevz\.com\/?/gi, "his website")
    .replace(
      /https:\/\/www\.linkedin\.com\/in\/victor-kuwandira/gi,
      "his LinkedIn profile"
    )
    .replace(/https:\/\/github\.com\/VictorKevz/gi, "his GitHub");
};
