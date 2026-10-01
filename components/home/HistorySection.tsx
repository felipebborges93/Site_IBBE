import React from "react";
import { historyData } from "@/content/history";
import { BookOpen } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "@/components/ui/FadeIn";

export function HistorySection() {
  return (
    <section id="historia" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho da Seção */}
      <FadeIn>
        <div className="border-b border-marinho/15 pb-8 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              03 / Origem &amp; Caminhada
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
              Uma história de{" "}
              <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                amor, alegria e esperança.
              </span>
            </h2>
          </div>
          <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
            Igreja Batista Bethel, organizada em Resende desde 28 de outubro de 2000.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Coluna Editorial Texto */}
        <FadeIn delay={0.1} className="lg:col-span-6 space-y-6 text-base sm:text-lg text-marinho/85 leading-relaxed font-normal">
          <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-marinho first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            {historyData.foundationText}
          </p>

          <p>
            {historyData.capelaText}
          </p>

          <p>
            {historyData.middleText}
          </p>

          <p>
            {historyData.missionsText}
          </p>

          <p>
            {historyData.closingText}
          </p>

          {/* Destaque Bíblico */}
          <div className="p-5 rounded-2xl bg-gelo border border-marinho/10 flex items-start gap-4 mt-6">
            <BookOpen aria-hidden="true" className="w-6 h-6 text-cobalto shrink-0 mt-0.5" weight="duotone" />
            <div>
              <p className="text-xs sm:text-sm text-marinho/80 italic font-medium leading-relaxed">
                &ldquo;{historyData.themeVerse.verse}&rdquo;
              </p>
              <span className="block text-xs font-bold text-cobalto mt-2 uppercase tracking-wider">
                — {historyData.themeVerse.reference}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Coluna Vídeo Institucional */}
        <FadeIn delay={0.2} className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-marinho/10 shadow-sm bg-marinho relative w-full aspect-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/WIMS_qEPMbA?rel=0"
              title="Vídeo comemorativo da história da Igreja Batista Bethel"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-marinho/60 px-1 gap-1">
            <span>Registro da nossa história e caminhada de fé</span>
            <span>Igreja Batista Bethel • Resende - RJ</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
