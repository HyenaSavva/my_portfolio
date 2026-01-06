import { useEffect, useState } from "react";

type Options = {
  containerId?: string;
  rootMargin?: string;
  attribute?: string;
};

export const useActiveSection = (
  sectionIds: string[],
  { containerId = "main-content", rootMargin = "-40% 0px -40% 0px", attribute = "id" }: Options = {},
) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container || !sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (!visible) return;

        const id = visible.target.getAttribute(attribute);
        if (id && sectionIds.includes(id)) setActiveId(id);
      },
      { root: container, rootMargin },
    );

    sectionIds.forEach((id) => {
      const el = document.querySelector(`[${attribute}="${id}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, containerId, rootMargin, attribute]);

  return activeId;
};
