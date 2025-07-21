import { GitHub, Language, LinkedIn } from "@mui/icons-material";

export const NavBar = () => {
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
            <img src="/logo.png" className="w-[3.5rem] h-auto" alt="" />
          </figure>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent uppercase flex items-end gap-1 tracking-wide">
            vctr
            <span
              className="rounded-full h-[.5rem] w-[.5rem] mb-2"
              style={{ background: "var(--purple-gradient)" }}
            ></span>
          </h1>
        </div>
        <ul className="flex items-center gap-5 -ml-10 md:-ml-20">
          {socialsData.map((item) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                className="bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] p-px rounded-full"
              >
                <item.icon
                  fontSize="large"
                  className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full p-1 hover:bg-none"
                />
              </a>
            </li>
          ))}
        </ul>
        <figure
          className="rounded-full p-px"
          style={{ background: "var(--purple-gradient)" }}
        >
          <img
            src="/profile.png"
            className="w-[3rem] h-[3rem] rounded-full"
            alt="Victor's profile picture"
          />
        </figure>
      </header>
    </div>
  );
};
