import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "white" | "gelo" | "transparent";
  elevation?: 1 | 2 | 3;
  rounded?: "2xl" | "3xl" | "none";
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Card({
  variant = "white",
  elevation = 1,
  rounded = "3xl",
  title,
  subtitle,
  children,
  className,
  ...props
}: CardProps) {
  const variantClasses = {
    white: "bg-white text-marinho border border-marinho/5",
    gelo: "bg-gelo text-marinho border border-cobalto/10",
    transparent: "bg-transparent text-marinho",
  };

  const elevationClasses = {
    1: "shadow-elevation-1",
    2: "shadow-elevation-2",
    3: "shadow-elevation-3",
  };

  const roundedClasses = {
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    none: "rounded-none",
  };

  return (
    <div
      className={twMerge(
        clsx(
                      "p-6 transition-all duration-200 motion-reduce:transition-none",
          variantClasses[variant],
          roundedClasses[rounded],
          variant !== "transparent" && elevationClasses[elevation],
          className
        )
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-bold tracking-tight text-marinho">{title}</h3>}
          {subtitle && <p className="text-sm text-marinho/70 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
