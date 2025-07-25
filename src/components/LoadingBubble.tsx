import { BeatLoaderWrapper } from "../loaders/Loaders";
import { AIBubble } from "./AIBubble";

export const LoadingBubble = () => {
  return (
    <AIBubble>
      <BeatLoaderWrapper />
    </AIBubble>
  );
};
