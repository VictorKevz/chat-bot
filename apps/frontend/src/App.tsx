import "./App.css";
import { Content } from "./components/Content";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main className="w-full min-h-screen bg-[var(--neutral-0)] flex flex-col items-center relative">
        <header
          className="w-full h-[9rem] 2xl:h-[12rem] bg-cover bg-center bg-no-repeat text-center flex flex-col justify-center items-center z-20 bg-[var(--neutral-0)] sticky top-0 rounded-b-[4rem]"
          style={{ backgroundImage: "url(/bg.png)" }}
        >
          <div className="h-full z-30 px-3 bg-transparent drop-shadow-2xl backdrop-blur-[3px] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-2 text-white uppercase">
              Get to know Victor
            </h1>
            <p className="text-sm max-w-xl w-[80%] text-[var(--neutral-900)]">
              This AI assistant is powered by real data and personal context to
              help you understand who Victor is, his skills, values, and career
              journey.
            </p>
          </div>
          <div className="absolute w-full h-full left-0 bottom-0 bg-black/30 rounded-b-[4rem] z-1"></div>
        </header>
        <Content />
      </main>
    </ThemeProvider>
  );
}

export default App;
