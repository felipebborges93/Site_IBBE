import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SectionDividerProps {
  variant?: "wave" | "arc" | "diagonal" | "slant";
  to?: "white" | "gelo" | "marinho";
  flip?: boolean;
  className?: string;
}

export function SectionDivider({
  variant = "wave",
  to = "white",
  flip = false,
  className,
}: SectionDividerProps) {
  const colorClasses = {
    white: "text-white",
    gelo: "text-gelo-light",
    marinho: "text-marinho",
  };

  const getSvgPath = () => {
    switch (variant) {
      case "arc":
        return "M0,0 C300,60 900,60 1200,0 L1200,60 L0,60 Z";
      case "diagonal":
        return "M0,60 L1200,0 L1200,60 L0,60 Z";
      case "slant":
        return "M0,0 L1200,40 L1200,60 L0,60 Z";
      case "wave":
      default:
        return "M0,24 C240,60 480,0 720,30 C960,60 1100,10 1200,24 L1200,60 L0,60 Z";
    }
  };

  return (
    <div
      className={twMerge(
        clsx(
          "w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]",
          flip && "transform -scale-y-100",
          colorClasses[to],
          className
        )
      )}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 md:h-16 lg:h-20 block"
      >
        <path d={getSvgPath()} fill="currentColor" />
      </svg>
    </div>
  );
}
