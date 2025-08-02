import { SvgIconComponent } from "@mui/icons-material";

type ChatButtonProps = {
  onToggle: () => void;
  icon: SvgIconComponent;
  color: string;
  ariaLabel: string;
};
export const ChatButton = ({
  onToggle,
  icon: Icon,
  color,
  ariaLabel,
}: ChatButtonProps) => {
  return (
    <button
      type="button"
      className={`text-white text-lg shadow-white/10 shadow-xl h-12 w-14 rounded-xl border border-[var(--border)] bg-[var(--neutral-0)]`}
      onClick={onToggle}
      aria-label={ariaLabel}
    >
      <span className={`text-[${color}]`}>
        <Icon />
      </span>
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
};
