import { jsx as _jsx } from "react/jsx-runtime";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "../context/ThemeContext";
const ToggleButton = () => {
    const { toggleTheme, theme } = useTheme();
    //   const isDark = theme === "dark"
    return (_jsx("div", { className: "absolute top-4 right-5 z-100", children: _jsx("button", { type: "button", className: "text-[var(--text)])", onClick: toggleTheme, children: theme === "light" ? (_jsx(DarkMode, { color: "secondary" })) : (_jsx(LightMode, { color: "primary" })) }) }));
};
export default ToggleButton;
