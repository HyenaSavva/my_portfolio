import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

const LAST_PROJECT_KEY = "last-viewed-project";

export const useScrollRestoration = (containerId: string, dependencies: unknown[] = []) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const lastProjectId = sessionStorage.getItem(LAST_PROJECT_KEY);
    if (!isHome || !lastProjectId) return;

    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-experience-id="${lastProjectId}"]`);
      if (el) {
        el.scrollIntoView({ block: "center" });
        sessionStorage.removeItem(LAST_PROJECT_KEY);
      }
    });
  }, [isHome, containerId, ...dependencies]);
};

export const saveLastProject = (projectId: string | number) => {
  sessionStorage.setItem(LAST_PROJECT_KEY, String(projectId));
};
