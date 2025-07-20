import "./App.css";
import { Content } from "./components/Content";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main className="w-full min-h-screen bg-[var(--neutral-0)] flex flex-col items-center relative">
        <header
          className="w-full h-[9rem] 2xl:h-[12rem] bg-cover bg-center bg-no-repeat text-center flex flex-col justify-center items-center z-20 bg-[var(--neutral-0)] sticky top-0 shadow-2xl"
          style={{ backgroundImage: "url(/bg.png)" }}
        >
          <div className="w-fit z-30 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-2 text-white">
              Get to know Victor
            </h1>
            <p className="text-base max-w-xl w-[90%] text-[var(--neutral-900)]">
              This AI assistant is powered by real data and personal context to
              help you understand who Victor is, his skills, values, and career
              journey.
            </p>
          </div>
          <div className="absolute w-full h-full left-0 bottom-0 bg-black/50 z-1"></div>
        </header>
        <Content />
      </main>
    </ThemeProvider>
  );
}

export default App;
