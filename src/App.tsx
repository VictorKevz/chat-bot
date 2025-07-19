import "./App.css";
import { Content } from "./components/Content";
import ToggleButton from "./components/ToggleButton";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main
        className="w-full min-h-screen bg-[var(--neutral-0)] bg-cover bg-top bg-no-repeat flex flex-col items-center  gap-4 relative"
        style={{ backgroundImage: "url(/bg.png)" }}
      >
        <header className="w-full min-h-[10rem] text-center flex flex-col justify-center items-center z-20 bg-[var(--neutral-0)] ">
          <h1 className="text-3xl font-bold mb-2 text-[var(--neutral-900)]">
            Get to know Victor
          </h1>
          <p className="text-base max-w-xl w-[90%] text-[var(--neutral-800)]">
            This AI assistant is powered by real data and personal context to
            help you understand who Victor is, his skills, values, and career
            journey.
          </p>
        </header>
        <ToggleButton />
        <Content />
        <div className="absolute left-0 bottom-0 w-full h-full bg-black/10 backdrop-blur-[.2rem] z-1"></div>
      </main>
    </ThemeProvider>
  );
}

export default App;
