import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { historyData } from "@/content/history";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Sparkle, UserCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Nossa História | Igreja Batista Bethel em Resende",
  description:
    "Conheça a trajetória da IBBE desde a fundação em 2000 por 28 pioneiros e a histórica construção da Capela dos 5 Dias em Vila Isabel, Resende - RJ.",
  openGraph: {
    title: "Nossa História | Igreja Batista Bethel em Resende",
    description:
      "Mais de duas décadas vivendo a fé cristã com simplicidade, acolhimento e amor ao próximo em Resende.",
  },
};

export default function NossaHistoriaPage() {
  return (
    <main className="min-h-screen bg-gelo-light pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Navegação de Retorno */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 min-h-[44px] py-2 text-xs sm:text-sm font-bold text-cobalto hover:text-marinho uppercase tracking-wider transition-colors motion-reduce:transition-none"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" weight="bold" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>

        {/* Cabeçalho da Página */}
        <header className="border-b border-marinho/15 pb-12 mb-16">
          <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-3">
            História &amp; Memória Institucional
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight leading-tight">
            Mais de duas décadas vivendo o amor de Cristo em{" "}
            <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
              Resende.
            </span>
          </h1>
          <p className="mt-6 text-lg text-marinho/80 max-w-2xl leading-relaxed">
            Uma trajetória forjada pela fé, coragem e generosidade de pessoas comuns que acreditaram no chamado de ser
            uma igreja viva, simples e acolhedora.
          </p>

          {/* Versículos de Referência */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-marinho/10 shadow-xs">
              <div className="flex items-center gap-2 text-cobalto font-bold text-xs uppercase tracking-wider mb-2">
                <BookOpen aria-hidden="true" className="w-4 h-4" weight="bold" />
                <span>Versículo Tema</span>
              </div>
              <p className="text-sm text-marinho/85 italic leading-relaxed">
                &ldquo;{historyData.themeVerse.verse}&rdquo;
              </p>
              <span className="block text-xs font-bold text-cobalto mt-2">— {historyData.themeVerse.reference}</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-marinho/10 shadow-xs">
              <div className="flex items-center gap-2 text-cobalto font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkle aria-hidden="true" className="w-4 h-4" weight="bold" />
                <span>Promessa Divina</span>
              </div>
              <p className="text-sm text-marinho/85 italic leading-relaxed">
                &ldquo;{historyData.jeremiasVerse.verse}&rdquo;
              </p>
              <span className="block text-xs font-bold text-cobalto mt-2">— {historyData.jeremiasVerse.reference}</span>
            </div>
          </div>
        </header>

        {/* Narrativa Fundacional em 2 Colunas */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-marinho/85 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-marinho">A Semente e o Mutirão Milagroso</h2>
            <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-marinho first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {historyData.foundationText}
            </p>
            <p>{historyData.capelaText}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-marinho/10 shadow-md bg-white">
              <div className="relative w-full h-80">
                <Image
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VSGtMBUe7IfJXHWFl_Mow4VMJKqrNgmxT1WKKx9dukdEOgB7sBsohq1QpW7ihIX6i5f1xBq233G_MKoGhgLPZ6qY26peMK0oIo_tdIN5HtYmoeFQQBYDQ_9St3ZOvAzDpBR3VETMKbOnlc7DyXYIvy-TOfWFbRYQCMAok8lrvz5K8G-WJNBnXSEJunLk1GDVkqAMjRoHwVr9e9-8TBVJA8JzYfEECkCz1nTgVWWYbxTUflFky1nOrAeYE"
                  alt="Comunhão da Igreja Batista Bethel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 bg-white text-xs text-marinho/70 border-t border-marinho/10">
                A capela de Vila Isabel: um testemunho vivo construído pela união e perseverança da comunidade.
              </div>
            </div>
          </div>
        </section>

        {/* Linha do Tempo Vertical */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              Linha do Tempo Cronológica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-marinho">Os Marcos da Nossa Jornada</h2>
          </div>

          <div className="relative max-w-3xl mx-auto pl-8 sm:pl-12 before:content-[''] before:absolute before:left-3.5 sm:before:left-5 before:top-3 before:bottom-3 before:w-[2px] before:bg-cobalto/25 space-y-12">
            {historyData.timeline.map((item, index) => (
              <div key={index} className="relative group">
                {/* Marcador Circular */}
                <span aria-hidden="true" className="absolute -left-8 sm:-left-12 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-4 border-cobalto shadow-sm flex items-center justify-center text-micro font-black text-cobalto transition-transform motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-110">
                  •
                </span>

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-marinho/10 shadow-xs hover:border-cobalto/30 transition-all motion-reduce:transition-none">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar aria-hidden="true" className="w-4 h-4 text-cobalto" weight="bold" />
                    <span className="text-sm font-extrabold text-cobalto tracking-wide">{item.year}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-marinho">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-marinho/75 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Liderança e Pastores */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              Legado &amp; Pastoreio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-marinho">Líderes que Marcaram Nossa História</h2>
            <p className="mt-3 text-sm text-marinho/70">
              Homens de Deus dedicados ao cuidado das ovelhas e ao ensino fiel das Escrituras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {historyData.pastors.map((pastor, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-white border border-marinho/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gelo flex items-center justify-center text-cobalto mb-6">
                    <UserCheck aria-hidden="true" className="w-6 h-6" weight="duotone" />
                  </div>
                  <span className="text-xs font-bold text-cobalto uppercase tracking-wider block mb-1">
                    {pastor.role}
                  </span>
                  <h3 className="text-xl font-bold text-marinho">{pastor.name}</h3>
                  {pastor.period && (
                    <span className="text-xs font-semibold text-marinho/50 block mt-1">{pastor.period}</span>
                  )}
                  {pastor.note && <p className="mt-4 text-xs sm:text-sm text-marinho/70 leading-relaxed">{pastor.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Convite Final para Visitar */}
        <section className="p-8 sm:p-12 rounded-3xl bg-marinho text-white text-center max-w-3xl mx-auto shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Faça parte desta história</h2>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Mais do que um templo de tijolos, a Bethel é uma família de braços abertos para acolher a sua história. Venha
            nos conhecer no próximo domingo.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#visita"
              className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-sm tracking-wide transition-colors motion-reduce:transition-none inline-flex items-center justify-center gap-2"
            >
              <span>Planeje sua visita</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" weight="bold" />
            </Link>
            <Link
              href="/#cultos"
              className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide transition-colors motion-reduce:transition-none border border-white/20 inline-flex items-center justify-center"
            >
              <span>Ver horários dos cultos</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
