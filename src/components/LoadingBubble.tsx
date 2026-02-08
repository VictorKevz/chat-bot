import { Loader } from "../loaders/Loaders";
import { ClipLoader } from "react-spinners";
import { AIBubble } from "./AIBubble";

export const LoadingBubble = () => {
  return (
    <AIBubble showProjects={false} disableAnimation>
      <Loader LoaderItem={ClipLoader} size={22} color="#ffde59d4" />
    </AIBubble>
  );
};
