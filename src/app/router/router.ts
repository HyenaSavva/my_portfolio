import { createRouter, createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "./layouts/__root";
import { createHomeRoute, createProjectRoute } from "@/pages";

const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createHomeRoute(rootRoute);
const projectRoute = createProjectRoute(rootRoute);

const routeTree = rootRoute.addChildren([homeRoute, projectRoute]);

export const router = createRouter({ routeTree, defaultViewTransition: true, scrollRestoration: true });
export type Router = typeof router;
