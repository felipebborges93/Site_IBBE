"use client";
import React, { ReactNode } from "react";
import { cn } from "@/utils/cn"; // Usually shadcn sets this up, I'll provide an alternative if needed

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  showRadialGradient?: boolean;
} & React.HTMLProps<HTMLDivElement>) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col min-h-[90vh] items-center justify-center bg-zinc-50 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "filter blur-[10px] invert-0 pointer-events-none absolute -inset-[10px] opacity-50",
              `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]`,
              `[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]`,
              `[--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a855f7_15%,#3b82f6_20%,#e879f9_25%,#3b82f6_30%)]`,
              `[background-image:var(--white-gradient),var(--aurora)]`,
              `dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              `[background-size:300%,_200%]`,
              `[background-position:50%_50%,50%_50%]`,
              `aurora-bg-animate`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
