import "./App.css";
import { Content } from "./components/Content";
import { NavBar } from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden">
        {/* Background Picture */}
        <picture className="pointer-events-none absolute inset-0 -z-10 h-full w-full">
          <source
            media="(min-width:1440px)"
            srcSet="/main-bg.svg"
            type="image/svg+xml"
          />
          <source
            media="(min-width:768px)"
            srcSet="/tablet-bg.png"
            type="image/png"
          />
          <source
            media="(max-width:767px)"
            srcSet="/mobile-bg.png"
            type="image/png"
          />
          <img
            src="/main-bg.svg"
            alt="Victor Chatbot Background"
            className="h-full w-full object-cover"
          />
        </picture>

        <div className="relative z-10 flex flex-col min-h-screen items-center w-full">
          <NavBar />
          <Content />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
