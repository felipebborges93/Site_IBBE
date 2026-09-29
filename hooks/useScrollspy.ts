"use client";

import { useEffect, useState } from "react";

export function useScrollspy(
  sectionIds: string[],
  offsetRootMargin = "-20% 0px -70% 0px"
): string {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: offsetRootMargin,
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offsetRootMargin]);

  return activeId;
}
