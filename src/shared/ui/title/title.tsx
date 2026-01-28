import type { FC } from "react";
import { cn } from "@/shared/lib";

interface TitleProps {
  label: string;
  className?: string;
}

export const Title: FC<TitleProps> = ({ label, className }) => <h1 className={cn("title", className)}>{label}</h1>;
