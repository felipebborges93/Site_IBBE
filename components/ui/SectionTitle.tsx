import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SectionTitleProps {
  children: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  children,
  highlight,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const renderTitle = () => {
    if (!highlight || typeof children !== "string") {
      return children;
    }

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = children.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === highlight.toLowerCase()) {
        return (
          <span
            key={index}
            className="font-script text-cobalto text-4xl sm:text-5xl md:text-6xl px-1 font-normal tracking-wide inline-block transform -rotate-1 align-baseline"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={twMerge(clsx("flex flex-col mb-12", alignClasses[align], className))}>
      <h2
        className={clsx(
          "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight",
          light ? "text-white" : "text-marinho"
        )}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "text-base sm:text-lg max-w-2xl mt-4 font-normal leading-relaxed",
            light ? "text-gelo/80" : "text-marinho/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
