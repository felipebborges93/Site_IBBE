import React from "react";
import { ministries } from "@/content/ministries";

export function MinistriesSection() {
  return (
    <section id="ministerios" className="py-20 lg:py-24 bg-gelo-light border-y border-marinho/10 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              06 / Servir com Alegria
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
              Nossos{" "}
              <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                ministérios.
              </span>
            </h2>
          </div>
          <p className="text-marinho/70 text-sm max-w-md leading-relaxed">
            Alcançar vidas, pastorear o rebanho e treinar líderes com amor prático e simplicidade cristã.
          </p>
        </div>

        {/* Grade Tipográfica Pura 01 a 08 com Linha Fina */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 border-t border-marinho/15 pt-10">
          {ministries.map((ministry, index) => {
            const numberLabel = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            const isSpecial = ministry.id === "acao-social";

            return (
              <div key={ministry.id} className="group">
                <span
                  className={`text-4xl font-extrabold block transition-colors motion-reduce:transition-none ${
                    isSpecial ? "text-verde/60 group-hover:text-verde" : "text-marinho/30 group-hover:text-cobalto/60"
                  }`}
                >
                  {numberLabel}
                </span>
                <h4 className="text-xl font-bold text-marinho mt-2 group-hover:text-cobalto transition-colors motion-reduce:transition-none">
                  {ministry.name}
                </h4>
                <p className="text-xs sm:text-sm text-marinho/70 mt-2 leading-relaxed">{ministry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
