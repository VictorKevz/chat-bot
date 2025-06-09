import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";

const ToggleButton = () => {
  const { toggleTheme, theme } = useTheme();
  //   const isDark = theme === "dark"
  return (
    <div className="absolute top-4 right-5">
      <button
        type="button"
        className="text-[var(--text)])"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <DarkMode color="secondary" />
        ) : (
          <LightMode color="primary" />
        )}
      </button>
    </div>
  );
};

export default ToggleButton;
