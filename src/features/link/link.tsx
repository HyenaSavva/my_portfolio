import type { FC } from "react";
import type { SimpleIcon } from "simple-icons";

import { Icon, Subtitle } from "@/shared/ui";

export const Link: FC<{ icon: SimpleIcon; href: string; label: string }> = ({
  icon,
  href,
  label,
}) => {
  return (
    <a href={href} target="_blank" className="flex gap-4 items-center group">
      <Icon
        icon={icon}
        className="w-8 h-8 dark:text-gray-600 group-hover:text-gray-400 transition-colors duration-200"
      />
      <Subtitle
        label={label}
        className="group-hover:text-gray-400 transition-colors duration-200"
      />
    </a>
  );
};
