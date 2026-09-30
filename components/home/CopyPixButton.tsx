"use client";

import React, { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";

interface CopyPixButtonProps {
  pixKey: string;
}

export function CopyPixButton({ pixKey }: CopyPixButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback gracioso
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`px-6 h-11 min-h-[44px] rounded-full border text-xs uppercase tracking-wider font-bold transition-all motion-reduce:transition-none inline-flex items-center gap-2 cursor-pointer shadow-2xs ${
        copied
          ? "bg-verde border-verde text-white"
          : "border-cobalto text-cobalto hover:bg-cobalto hover:text-white"
      }`}
    >
      {copied ? (
        <>
          <Check aria-hidden="true" className="w-4 h-4" weight="bold" />
          <span>Chave copiada!</span>
        </>
      ) : (
        <>
          <Copy aria-hidden="true" className="w-4 h-4" weight="bold" />
          <span>Copiar chave PIX</span>
        </>
      )}
    </button>
  );
}
