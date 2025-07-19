// Keep all your types in here but you can adjust as your project grows!
export type Theme = "light" | "dark";
export interface ThemeContextType {
  theme: Theme;
  setTheme: (state: Theme) => void;
  toggleTheme: () => void;
}
