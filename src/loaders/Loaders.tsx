import { BeatLoader, RiseLoader } from "react-spinners";

export const BeatLoaderWrapper = () => {
  return <BeatLoader color="#ffde59d4" size={20} />;
};

export const RiseLoaderWrapper = () => {
  return <RiseLoader color="#ffde59d4" size={22} />;
};

type LoaderProps = {
  LoaderItem: React.ElementType;
  color: string;
  size: number;
};

export const Loader = ({ LoaderItem, color, size }: LoaderProps) => {
  return <LoaderItem color={color} size={size} />;
};
