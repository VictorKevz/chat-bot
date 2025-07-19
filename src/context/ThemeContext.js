import { jsx as _jsx } from "react/jsx-runtime";
// src/context/ThemeContext.tsx
import { createContext, useEffect, useState, useContext, } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        if (typeof localStorage !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved === "dark" || saved === "light")
                return saved;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };
    const [theme, setThemeState] = useState(getInitialTheme);
    const setTheme = (theme) => {
        setThemeState(theme);
        localStorage.setItem("theme", theme);
    };
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        }
        else {
            root.classList.remove("dark");
        }
    }, [theme]);
    return (_jsx(ThemeContext.Provider, { value: { theme, setTheme, toggleTheme }, children: children }));
};
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
