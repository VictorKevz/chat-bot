import "./App.css";
import { Content } from "./components/Content";
import { NavBar } from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main className="w-full min-h-screen bg-[var(--neutral-0)] flex flex-col items-center relative">
        <NavBar />
        <Content />
      </main>
    </ThemeProvider>
  );
}

export default App;
