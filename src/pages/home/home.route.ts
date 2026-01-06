import { createRoute, type AnyRoute } from "@tanstack/react-router";
import { HomePage } from "./home-page";

export const createHomeRoute = <TParent extends AnyRoute>(parentRoute: TParent) =>
  createRoute({ getParentRoute: () => parentRoute, path: "/", component: HomePage });
