import { ProjectPreviewProps } from "../../types/projects";

export const ProjectPreview = ({ data }: ProjectPreviewProps) => {
  const { title, image_urls: images, live_url } = data;
  return (
    <div className="w-full flex flex-col items-center px-4 pb-6 bg-[var(--neutral-500)] rounded-xl">
      <figure
        className=" rounded-full bg-[var()] -mt-9 px-px shadow-2xl"
        style={{ background: "var(--purple-gradient)" }}
      >
        <img src={images?.[0]} alt="" className="w-18 h-18 rounded-full" />
      </figure>
      <h3 className="text-white text-xl md:text-2xl my-2">{title}</h3>
      <div className="w-full flex items-center justify-between gap-5 my-5">
        <button
          type="button"
          className="h-10 min-w-fit md:max-w-[130px] w-full rounded-xl bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)]"
        >
          Learn More
        </button>
        <a
          href={live_url}
          className="h-10 min-w-fit md:max-w-[130px] w-full rounded-xl bg-[var(--neutral-0)] text-[var(--secondary-color)] border border-[var(--secondary-color)]"
        >
          Demo
        </a>
      </div>
      <div
        className="w-full min-h-[10rem] bg-cover bg-top bg-no-repeat rounded-xl"
        style={{ backgroundImage: `url(${images?.[1]})` }}
      ></div>
    </div>
  );
};
