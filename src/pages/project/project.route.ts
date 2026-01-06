import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { ProjectPage } from "./project-page";

export const createProjectRoute = <TParent extends AnyRoute>(parentRoute: TParent) =>
  createRoute({ getParentRoute: () => parentRoute, path: "/project/$id", component: ProjectPage });
