import {
  GitHub,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Language,
  LinkedIn,
  Person,
} from "@mui/icons-material";
import { useState } from "react";

export const NavBar = () => {
  const [showSocials, setShowSocials] = useState<boolean>(false);

  const toggleSocials = () => {
    setShowSocials((prev) => !prev);
  };
  const socialsData = [
    { id: "website", icon: Language, url: "https://victorkevz.com/" },
    { id: "gitHub", icon: GitHub, url: "https://github.com/VictorKevz" },
    {
      id: "linkedIn",
      icon: LinkedIn,
      url: "https://www.linkedin.com/in/victor-kuwandira",
    },
  ];
  return (
    <div className="w-full bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] pb-px rounded-b-[4rem] z-20">
      <header className="w-full h-[5rem] flex justify-between items-center  bg-[var(--neutral-100)] sticky top-0 shadow-lg px-8 rounded-b-[4rem]">
        <div className="flex items-center gap-2">
          <figure>
            <img
              src="/logo.png"
              className="w-[2.5rem] sm:w-[3.5rem] h-auto"
              alt=""
            />
          </figure>
          <h1 className="text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent uppercase flex items-end gap-1 tracking-wide">
            vctr
            <span
              className="rounded-full h-[.5rem] w-[.5rem] mb-2"
              style={{ background: "var(--purple-gradient)" }}
            ></span>
          </h1>
        </div>
        <div className="relative flex items-center justify-center scale-80 sm:scale-100">
          <div
            className="rounded-lg p-px"
            style={{ background: "var(--purple-gradient)" }}
          >
            <span
              role="button"
              className="md:hidden text-white/85 h-10 w-12  flex items-center justify-center bg-[var(--neutral-100)] rounded-xl"
              onClick={toggleSocials}
            >
              <Person />
              <span className="-ml-1 text-[var(--primary-color)]">
                {showSocials ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </span>
            </span>
          </div>
          <ul
            className={`${
              showSocials ? "flex mt-8 p-5" : "hidden md:flex"
            } absolute top-full rounded-xl bg-[var(--neutral-200)] items-center gap-5 -ml-10 md:-ml-20 md:relative md:flex-row md:bg-transparent md:rounded-none md:mt-0 md:p-0`}
          >
            {socialsData.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  className=" p-px rounded-full"
                >
                  <item.icon
                    fontSize="large"
                    className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full p-1"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <figure
          className="rounded-full p-px"
          style={{ background: "var(--purple-gradient)" }}
        >
          <img
            src="/profile.png"
            className="w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem] rounded-full"
            alt="Victor's profile picture"
          />
        </figure>
      </header>
    </div>
  );
};
