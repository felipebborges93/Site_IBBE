import React from "react";
import { siteConfig } from "@/content/site";
import { CopyPixButton } from "./CopyPixButton";

export function PixSection() {
  const pixKey = siteConfig.contact.pixKey || "04.123.456/0001-78";

  return (
    <section id="contribuir" className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      <div className="max-w-3xl mx-auto border-t border-b border-marinho/15 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md text-center md:text-left">
          <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-1">
            Generosidade &amp; Missões
          </span>
          <h3 className="text-2xl font-bold text-marinho">Dízimos e Ofertas com alegria</h3>
          <p className="text-xs sm:text-sm text-marinho/70 mt-2 leading-relaxed">
            Seus recursos mantêm as portas da capela abertas em Vila Izabel e abastecem mensalmente as cestas de alimentos
            distribuídas às famílias da comunidade.
          </p>
        </div>

        <div className="text-center md:text-right w-full md:w-auto">
          <span className="text-xs text-marinho/60 block mb-1 font-medium">Chave CNPJ (PIX):</span>
          <div className="font-mono text-sm font-bold text-marinho bg-gelo-light px-4 py-2 rounded-lg border border-marinho/10 select-all mb-3 inline-block">
            {pixKey}
          </div>
          <div>
            <CopyPixButton pixKey={pixKey} />
          </div>
        </div>
      </div>
    </section>
  );
}
