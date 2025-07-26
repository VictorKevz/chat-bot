import "./App.css";
import { Content } from "./components/Content";
import { NavBar } from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <main
        className="w-full min-h-screen flex flex-col items-center relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/main-bg.svg)" }}
      >
        <NavBar />
        <Content />
      </main>
    </ThemeProvider>
  );
}

export default App;
