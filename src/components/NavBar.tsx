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
    <header className="w-full h-[5rem] flex justify-between items-center z-20 bg-[var(--neutral-100)] sticky top-0 shadow-lg px-4">
      <div className="flex items-center gap-2">
        <figure>
          <img src="/logo.png" className="w-[3.5rem] h-auto" alt="" />
        </figure>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent uppercase flex items-end gap-1 tracking-wide">
          vctr
          <span
            className="rounded-full h-[.5rem] w-[.5rem] mb-2"
            style={{ background: "var(--purple-gradient)" }}
          ></span>
        </h1>
      </div>
      <ul className="flex items-center gap-5">
        {socialsData.map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              className="bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] rounded-sm h-7 w-7 hover:from-[var(--primary-color)] hover:to-[var(--secondary-color)]"
            >
              <item.icon />
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
          className="w-[3.5rem] h-[3.5rem] rounded-full"
          alt="Victor's profile picture"
        />
      </figure>
    </header>
  );
};
