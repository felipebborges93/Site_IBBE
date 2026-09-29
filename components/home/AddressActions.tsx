"use client";

import React, { useState } from "react";
import { ArrowUpRight, Copy, Check, NavigationArrow } from "@phosphor-icons/react";

interface AddressActionsProps {
  address: string;
}

export function AddressActions({ address }: AddressActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback sem crash
    }
  };

  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(address)}`;

  return (
    <div className="pt-2 flex flex-wrap items-center gap-3">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow"
      >
        <span>Google Maps</span>
        <ArrowUpRight className="w-4 h-4" weight="bold" />
      </a>

      <a
        href={wazeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-marinho/20 hover:border-cobalto text-marinho hover:text-cobalto font-bold text-xs uppercase tracking-wider transition-colors"
      >
        <NavigationArrow className="w-4 h-4" weight="bold" />
        <span>Waze</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-4 h-11 rounded-full text-xs font-bold uppercase tracking-wider text-marinho/70 hover:text-marinho hover:bg-black/5 transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-verde" weight="bold" />
            <span className="text-verde">Endereço copiado!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-marinho/50" weight="bold" />
            <span>Copiar endereço</span>
          </>
        )}
      </button>
    </div>
  );
}
