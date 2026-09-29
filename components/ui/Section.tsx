import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "white" | "gelo" | "marinho";
  children: React.ReactNode;
}

export function Section({
  id,
  background = "white",
  className,
  children,
  ...props
}: SectionProps) {
  const bgClasses = {
    white: "bg-white text-marinho",
    gelo: "bg-gelo-light text-marinho",
    marinho: "bg-marinho text-white",
  };

  return (
    <section
      id={id}
      className={twMerge(
        clsx(
          "py-16 lg:py-24 relative overflow-hidden transition-colors duration-200",
          bgClasses[background],
          className
        )
      )}
      {...props}
    >
      {children}
    </section>
  );
}
