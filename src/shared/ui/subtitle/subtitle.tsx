import type { FC, HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type SubtitleProps = {
  label: string;
  className?: string;
  active?: boolean;
} & HTMLProps<HTMLHeadingElement>;

export const Subtitle: FC<SubtitleProps> = ({
  label,
  className = "",
  active,
}) => {
  const styles = twMerge(
    `${className} text-3xl font-semibold dark:text-gray-600 font-jetbrains ` +
      (active ? "dark:text-gray-500" : ""),
    className
  );

  return <h2 className={styles}>{label}</h2>;
};
