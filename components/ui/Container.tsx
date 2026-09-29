import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
}

export function Container({
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-[1440px]",
    full: "max-w-full",
  };

  return (
    <div
      className={twMerge(
        clsx("mx-auto w-full px-6 lg:px-12", sizeClasses[size], className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}
