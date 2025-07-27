import { ProjectPreviewProps } from "../../types/projects";

export const ProjectPreview = ({ data, onToggle }: ProjectPreviewProps) => {
  const { title, image_urls: images, live_url } = data;
  return (
    <div className="w-full flex flex-col items-center px-4 py-6 bg-[#0f1010a5] backdrop-blur-[1rem] border border-[var(--border)] rounded-xl">
      <h3 className="text-white text-xl md:text-2xl my-2">{title}</h3>
      <div className="w-full flex items-center justify-between gap-5 my-5">
        <button
          type="button"
          onClick={() => onToggle(data)}
          className="h-10 min-w-fit md:max-w-[130px] w-full rounded-xl bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] hover:from-[#8c52ff] hover:to-[#5ce1e6] hover:-translate-0.5 hover:scale-105"
        >
          Learn More
        </button>
        <a
          href={live_url}
          target="_blank"
          className="h-10 flex items-center justify-center min-w-fit md:max-w-[130px] w-full rounded-xl bg-[var(--neutral-0)] text-[var(--secondary-color)] border border-[var(--secondary-color)] hover:border-0 hover:bg-gradient-to-r hover:from-[#0cc0df] hover:to-[#ffde59d4] hover:text-black/90 hover:-translate-0.5 hover:scale-105"
        >
          Demo
        </a>
      </div>
      <div
        className="w-full min-h-[10rem] bg-cover bg-top bg-no-repeat border border-[var(--border)] rounded-xl shadow-2xl"
        style={{ backgroundImage: `url(${images?.[1]})` }}
      ></div>
    </div>
  );
};

export const ProjectDialogWrapper = () => {};
