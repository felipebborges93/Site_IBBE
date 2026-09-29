import React from "react";
import Link from "next/link";
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
          "inline-flex items-center gap-3 select-none group focus:outline-none",
          className
        )
      )}
      aria-label="IBBE - Igreja Batista Bethel em Resende"
    >
      {/* Símbolo Cruz / Comunidade em SVG inline */}
      <div
        className={clsx(
          "w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
          light ? "bg-white text-marinho shadow-md" : "bg-cobalto text-white shadow-elevation-1"
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          {/* Cruz estilizada com hastes curvas suaves */}
          <path
            d="M16 4V28M9 11H23"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ponto / chama do Espírito Santo */}
          <circle cx="16" cy="7" r="1.5" fill="#48A4FF" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <span
          className={clsx(
            "text-lg sm:text-xl font-extrabold tracking-tight leading-none",
            light ? "text-white" : "text-marinho"
          )}
        >
          BETHEL <span className={light ? "text-ceu" : "text-cobalto font-medium"}>RESENDE</span>
        </span>
        <span
          className={clsx(
            "text-[10px] sm:text-xs tracking-wider uppercase font-semibold mt-0.5",
            light ? "text-gelo/70" : "text-marinho/60"
          )}
        >
          Igreja Batista
        </span>
      </div>
    </Link>
  );
}
