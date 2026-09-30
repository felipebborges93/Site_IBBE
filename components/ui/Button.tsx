import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-cobalto focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-cobalto text-white hover:bg-cobalto/90 shadow-md hover:shadow-lg",
    secondary: "bg-gelo text-marinho hover:bg-gelo/80",
    ghost: "bg-transparent text-marinho hover:bg-marinho/5 font-medium",
  };

  const sizeClasses = {
    sm: "px-4 py-2.5 min-h-[44px] text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const computedClasses = twMerge(
    clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)
  );

  if (href) {
    return (
      <a href={href} className={computedClasses} target={target} rel={rel} {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }

  return (
    <button className={computedClasses} {...props}>
      {children}
    </button>
  );
}
