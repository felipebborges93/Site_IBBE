import React from "react";
import Image from "next/image";
import Link from "next/link";
import { historyData } from "@/content/history";
import { ArrowRight, BookOpen } from "@phosphor-icons/react/dist/ssr";

export function HistorySection() {
  return (
    <section id="historia" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho da Seção */}
      <div className="border-b border-marinho/15 pb-8 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
            03 / Origem &amp; Caminhada
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
            Uma história de{" "}
            <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
              amor.
            </span>
          </h2>
        </div>
        <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
          Resende, outubro de 2000. Uma pequena semente plantada pela dedicação de 28 irmãos no bairro Toyota.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Coluna Editorial Texto */}
        <div className="lg:col-span-6 space-y-6 text-base sm:text-lg text-marinho/85 leading-relaxed font-normal">
          <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-marinho first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            A Igreja Batista Bethel nasceu em <strong>28 de outubro de 2000</strong> através de 28 irmãos corajosos que
            compartilhavam um desejo puro: servir de perto as famílias de Resende, com as mãos prontas para o trabalho e
            o coração sensível à dor do próximo.
          </p>

          <p>
            O coração da comunidade começou a pulsar nos projetos com as crianças da comunidade, oferecendo carinho,
            acolhimento, café da manhã e lições de vida no Evangelho.
          </p>

          <p>
            Em <strong>7 de novembro de 2003</strong>, com mutirão solidário dos próprios membros, tijolo por tijolo,
            erguemos em apenas 5 dias corridos a nossa capela em Vila Izabel — batizada carinhosamente por todos de{" "}
            <em>&quot;Igrejinha do Cantão&quot;</em>. Desde esse dia, este solo é um porto seguro para quem procura descanso e
            recomeço.
          </p>

          {/* Destaque Bíblico de Jeremias 29:11 */}
          <div className="p-5 rounded-2xl bg-gelo border border-marinho/10 flex items-start gap-4">
            <BookOpen aria-hidden="true" className="w-6 h-6 text-cobalto shrink-0 mt-0.5" weight="duotone" />
            <div>
              <p className="text-xs sm:text-sm text-marinho/80 italic font-medium leading-relaxed">
                &ldquo;{historyData.jeremiasVerse.verse}&rdquo;
              </p>
              <span className="block text-xs font-bold text-cobalto mt-2 uppercase tracking-wider">
                — {historyData.jeremiasVerse.reference}
              </span>
            </div>
          </div>

          {/* Marcos Históricos Tipográficos com Linhas Finas */}
          <div className="pt-8 mt-8 border-t border-marinho/15 grid grid-cols-3 gap-6">
            <div>
              <span className="text-3xl font-extrabold text-marinho tracking-tight block">2000</span>
              <span className="text-xs uppercase text-marinho/60 font-semibold mt-1 block">Fundação</span>
              <p className="text-xs text-marinho/70 mt-1">28 pioneiros</p>
            </div>
            <div className="border-l border-marinho/15 pl-4 sm:pl-6">
              <span className="text-3xl font-extrabold text-marinho tracking-tight block">5 dias</span>
              <span className="text-xs uppercase text-marinho/60 font-semibold mt-1 block">Mutirão</span>
              <p className="text-xs text-marinho/70 mt-1">Igrejinha do Cantão</p>
            </div>
            <div className="border-l border-marinho/15 pl-4 sm:pl-6">
              <span className="text-3xl font-extrabold text-cobalto tracking-tight block">Hoje</span>
              <span className="text-xs uppercase text-marinho/60 font-semibold mt-1 block">Comunidade</span>
              <p className="text-xs text-marinho/70 mt-1">Portas abertas</p>
            </div>
          </div>

          {/* Botão CTA para página completa */}
          <div className="pt-4">
            <Link
              href="/nossa-historia"
              className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] rounded-full bg-cobalto hover:bg-cobalto/90 text-white text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow group"
            >
              <span>Conheça nossa história completa</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform motion-reduce:transition-none group-hover:translate-x-1 motion-reduce:transform-none" weight="bold" />
            </Link>
          </div>
        </div>

        {/* Coluna Fotografia Humanizada */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-marinho/10 shadow-sm bg-gelo-light relative w-full h-[380px] sm:h-[440px]">
            <Image
              src="/images/culto_3.jpg"
              alt="Comunidade acolhedora da Igreja Batista Bethel reunida em Resende"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-marinho/60 px-1 gap-1">
            <span>Encontro comunitário no pátio da capela em Vila Izabel</span>
            <span>Resende • RJ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
