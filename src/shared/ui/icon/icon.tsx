import type { FC } from "react";
import type { SimpleIcon } from "simple-icons";

type IconProps = {
  icon: SimpleIcon;
  className?: string;
  w?: number;
  h?: number;
};

export const Icon: FC<IconProps> = ({ icon, className, w, h }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={w}
      height={h}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};
