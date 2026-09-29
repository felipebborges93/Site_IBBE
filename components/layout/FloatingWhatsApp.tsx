"use client";

import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { siteConfig } from "@/content";

export function FloatingWhatsApp() {
  const rawPhone = siteConfig.contact.whatsapp || "";
  const sanitizedDigits = rawPhone.replace(/\D/g, "");
  // Se for placeholder ou não contiver dígitos suficientes, usar fallback seguro da IBBE
  const phone =
    sanitizedDigits.length >= 10 ? sanitizedDigits : "5524999999999";

  const message =
    "Olá! Visitei o site da Igreja Batista Bethel em Resende e gostaria de mais informações.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center text-3xl shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <WhatsappLogo size={32} weight="fill" />
    </a>
  );
}
