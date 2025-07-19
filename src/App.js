import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Content } from "./components/Content";
import ToggleButton from "./components/ToggleButton";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
    return (_jsx(ThemeProvider, { children: _jsxs("main", { className: "w-full min-h-screen bg-[var(--neutral-0)] bg-cover bg-top bg-no-repeat flex flex-col items-center  gap-4 relative", style: { backgroundImage: "url(/bg.png)" }, children: [_jsxs("header", { className: "w-full min-h-[10rem] text-center flex flex-col justify-center items-center z-20 bg-[var(--neutral-0)] ", children: [_jsx("h1", { className: "text-3xl font-bold mb-2 text-[var(--neutral-900)]", children: "Get to know Victor" }), _jsx("p", { className: "text-base max-w-xl w-[90%] text-[var(--neutral-800)]", children: "This AI assistant is powered by real data and personal context to help you understand who Victor is, his skills, values, and career journey." })] }), _jsx(ToggleButton, {}), _jsx(Content, {}), _jsx("div", { className: "absolute left-0 bottom-0 w-full h-full bg-black/10 z-1" })] }) }));
}
export default App;
