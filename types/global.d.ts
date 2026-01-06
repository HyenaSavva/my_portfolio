import type { ReactElement } from "react";
import type { Router } from "@/app/router";
import type { Experience } from "@/shared/types/supabase.types";

declare global {
  type Router = Router;
  type ExperienceType = Experience;

  type TagType = {
    name: NonNullable<ExperienceType["tags"]>[number] | "View on Github";
    url?: string;
    icon: ReactElement;
    color: string;
  };
}
export {};

declare module "@fontsource-variable/*" {}
