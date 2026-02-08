import { OpenInFull, OpenInNew } from "@mui/icons-material";
import { ProjectPreviewProps } from "../../types/projects";

export const ProjectPreview = ({ data, onToggle }: ProjectPreviewProps) => {
  const { title, image_urls: images, live_url } = data;
  const previewImage = images?.[1] ?? images?.[0];
  return (
    <div className="w-full max-w-[22rem] bg-[var(--neutral-100)] rounded-3xl border border-white/30 shadow-[0_12px_30px_rgba(0,0,0,0.25)] p-2">
      <div className="relative w-full aspect-[4/3] bg-[var(--neutral-200)] rounded-2xl overflow-hidden">
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${title} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-[var(--neutral-600)]">
            No image
          </div>
        )}
        <button
          type="button"
          onClick={() => onToggle(data)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/55"
          aria-label="Open project details"
        >
          <OpenInFull fontSize="small" aria-hidden="true" />
          <span className="sr-only">Open details</span>
        </button>
      </div>
      <div className="w-full flex items-center justify-between gap-3 px-2 pt-3 pb-1">
        <h3 className="text-[var(--neutral-900)] text-sm sm:text-base font-semibold truncate">
          {title}
        </h3>
        {live_url && (
          <a
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-black border border-transparent flex items-center justify-center hover:opacity-90"
            aria-label="Open live project"
          >
            <OpenInNew fontSize="small" aria-hidden="true" />
            <span className="sr-only">Open live project</span>
          </a>
        )}
      </div>
    </div>
  );
};

export const ProjectDialogWrapper = () => {};
