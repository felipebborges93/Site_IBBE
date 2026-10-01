import React from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface LogoProps {
  className?: string;
  light?: boolean;
}

export function Logo({ className, light = false }: LogoProps) {
  return (
    <Link
      href="#inicio"
      className={twMerge(
        clsx(
          "inline-flex items-center gap-3 select-none group min-h-[44px] focus:outline-none",
          className
        )
      )}
      aria-label="IBBE - Igreja Batista Bethel em Resende"
    >
      <div
        className={clsx(
          "relative flex items-center justify-center transition-transform duration-200 motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-[1.02]",
          light && "brightness-0 invert"
        )}
      >
        <Image
          src="/images/logo.png"
          alt="IBBE Logo"
          width={220}
          height={60}
          className="object-contain w-auto h-10 sm:h-12"
          priority
        />
      </div>
    </Link>
  );
}
