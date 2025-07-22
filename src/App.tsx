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
        {/* <img
          src="/bg-bottom-left.png"
          className="absolute bottom-0 right-0 w-full h-[80vh]"
          alt=""
        /> */}
        {/* <img
          src="/bg-top-right.png"
          className="absolute top-0 right-0 w-[30rem]"
          alt=""
        /> */}
      </main>
    </ThemeProvider>
  );
}

export default App;
