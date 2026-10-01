import React from "react";
import { FaqAccordion } from "./FaqAccordion";

export function VisitSection() {
  return (
    <section id="visita" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-marinho/15 pb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
            08 / Primeira Vez Conosco
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
            Planeje sua{" "}
            <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
              visita.
            </span>
          </h2>
        </div>
        <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
          Sabemos que visitar uma igreja pela primeira vez pode gerar dúvidas. Veja como é simples.
        </p>
      </div>

      {/* 3 Passos Editoriais com Numeração Gigante */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div>
          <span className="text-6xl font-extrabold text-marinho/25 block mb-4">01</span>
          <h3 className="text-2xl font-bold text-marinho mb-2">Venha como você está</h3>
          <p className="text-sm text-marinho/75 leading-relaxed">
            Sem formalidades de vestimenta. Venha com a roupa do seu dia a dia, confortável, exatamente como você é.
          </p>
        </div>

        <div>
          <span className="text-6xl font-extrabold text-marinho/25 block mb-4">02</span>
          <h3 className="text-2xl font-bold text-marinho mb-2">Recebido com afeto</h3>
          <p className="text-sm text-marinho/75 leading-relaxed">
            Um aperto de mão sincero na entrada, sem constrangimento público. Ajudamos a encontrar um bom lugar.
          </p>
        </div>

        <div>
          <span className="text-6xl font-extrabold text-marinho/25 block mb-4">03</span>
          <h3 className="text-2xl font-bold text-marinho mb-2">Sua família tem lugar</h3>
          <p className="text-sm text-marinho/75 leading-relaxed">
            As crianças são acolhidas no Bethel Kids com atividades seguras enquanto você assiste ao culto em paz.
          </p>
        </div>
      </div>

      {/* Acordeão Minimalista de Linhas Finas (FAQ) */}
      <div className="max-w-3xl mx-auto pt-10 border-t border-marinho/15">
        <h3 className="text-xl font-bold text-marinho mb-8 text-center">Dúvidas comuns de quem nos visita:</h3>
        <FaqAccordion />
      </div>
    </section>
  );
}
