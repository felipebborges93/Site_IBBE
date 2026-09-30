"use client";

import React, { useState } from "react";
import { faqItems } from "@/content/faq";
import { siteConfig } from "@/content/site";
import { Plus, Minus, WhatsappLogo } from "@phosphor-icons/react";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>("roupas");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(
    "Olá! Gostaria de tirar uma dúvida sobre a visita à Igreja Batista Bethel em Resende."
  );
  const waUrl = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

  return (
    <div className="w-full">
      <div className="divide-y divide-marinho/15 border-y border-marinho/15">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id}>
              <h3>
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-5 text-left flex justify-between items-center font-bold text-base text-marinho hover:text-cobalto transition-colors motion-reduce:transition-none group cursor-pointer"
                >
                  <span className="pr-4">{item.question}</span>
                  <span className="shrink-0 text-cobalto">
                    {isOpen ? (
                      <Minus aria-hidden="true" className="w-5 h-5 transition-transform duration-200 motion-reduce:transition-none" weight="bold" />
                    ) : (
                      <Plus aria-hidden="true" className="w-5 h-5 transition-transform duration-200 motion-reduce:transition-none" weight="bold" />
                    )}
                  </span>
                </button>
              </h3>

              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                aria-hidden={!isOpen}
                className={`overflow-hidden transition-all duration-300 motion-reduce:transition-none ${
                  isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"
                }`}
              >
                <p className="text-sm text-marinho/75 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão de Dúvidas Direto no WhatsApp */}
      <div className="mt-8 text-center sm:text-right">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ainda tem dúvidas? Fale conosco no WhatsApp (abre em nova aba)"
          className="inline-flex items-center gap-2 min-h-[44px] py-2 text-xs font-bold text-cobalto hover:text-marinho uppercase tracking-wider transition-colors motion-reduce:transition-none"
        >
          <WhatsappLogo aria-hidden="true" className="w-4 h-4" weight="bold" />
          <span>Ainda tem dúvidas? Fale conosco no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
