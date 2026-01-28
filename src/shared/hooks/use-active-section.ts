import { useEffect, useState, useCallback } from "react";

interface Options {
  attribute?: string;
  containerId?: string;
}

export const useActiveSection = (
  sectionIds: string[],
  { attribute = "data-experience-id", containerId = "main-content" }: Options = {},
) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  const updateActive = useCallback(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestId = sectionIds[0];
    let closestDistance = Infinity;

    for (const id of sectionIds) {
      const el = document.querySelector(`[${attribute}="${id}"]`);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = id;
      }
    }

    setActiveId(closestId);
  }, [sectionIds, attribute, containerId]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    updateActive();

    container.addEventListener("scroll", updateActive, { passive: true });
    return () => container.removeEventListener("scroll", updateActive);
  }, [updateActive, containerId]);

  return activeId;
};
