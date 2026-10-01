import React from "react";
import { services } from "@/content/services";
import { calculateNextService } from "@/lib/utils/services";
import { VideoCamera, Users, Clock, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export function ServicesSection() {
  const nextServiceResult = calculateNextService(services);

  return (
    <section id="cultos" className="py-20 lg:py-24 bg-gelo-light border-y border-marinho/10 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho da Seção */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
                01 / Encontros Semanais
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
                Cultos e{" "}
                <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                  Atividades.
                </span>
              </h2>
            </div>
            <p className="text-marinho/70 text-sm max-w-md leading-relaxed">
              Sem formalidades desnecessárias. Um ambiente sereno para desacelerar da rotina, orar e ouvir a Palavra.
            </p>
          </div>
        </FadeIn>

        {/* Visualização Compacta em Cards Grid */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => {
            const isNext = item.id === nextServiceResult.service.id;
            const numberLabel = `0${index + 1}`;

            let scheduleBadge = item.day;
            let note = "Entrada livre • Todos bem-vindos";
            let modality = "Presencial";
            let timeRange = item.time;

            if (item.id === "culto-manha") {
              scheduleBadge = "Domingo Manhã";
              note = "Entrada livre • Todos bem-vindos";
              modality = "Presencial & Live";
              timeRange = "08:30 às 10:00";
            } else if (item.id === "ebd") {
              scheduleBadge = "Domingo Manhã";
              note = "Classes para todas as idades";
              modality = "Presencial";
              timeRange = "10:00 às 11:00";
            } else if (item.id === "culto-noite") {
              scheduleBadge = "Domingo Noite";
              note = "Entrada livre • Todos bem-vindos";
              modality = "Presencial & Live";
              timeRange = "18:00 às 19:30";
            } else if (item.id === "bethel-kids") {
              scheduleBadge = "Quinta-feira";
              note = "Ministério Infantil na Igreja";
              modality = "Presencial";
              timeRange = "19:30 às 21:00";
            } else if (item.id === "pgm") {
              scheduleBadge = "Durante a semana";
              note = "Nos lares da cidade";
              modality = "Presencial";
              timeRange = "Vários horários";
            }

            return (
              <FadeInItem key={item.id} className="h-full">
                <div
                  className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border transition-all duration-300 h-full hover:-translate-y-1.5 ${
                    isNext
                      ? "bg-white border-cobalto/40 shadow-elevation-1 hover:shadow-elevation-2 ring-2 ring-cobalto/15"
                      : "bg-white/80 hover:bg-white border-marinho/10 shadow-xs hover:border-cobalto/25 hover:shadow-elevation-1"
                  }`}
                >
                  <div>
                    {/* Topo do Card: Número, Badge e Tag */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-black ${isNext ? "text-cobalto" : "text-marinho/35"}`}>
                          {numberLabel}
                        </span>
                        {isNext && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-verde/15 text-verde text-micro font-bold">
                            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-verde animate-pulse" />
                            Próximo
                          </span>
                        )}
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-micro uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                          modality.includes("Live")
                            ? "text-cobalto bg-cobalto/5 border-cobalto/20"
                            : "text-marinho/70 bg-gelo border-marinho/15"
                        }`}
                      >
                        {modality.includes("Live") ? (
                          <VideoCamera aria-hidden="true" className="w-3 h-3 text-cobalto" weight="bold" />
                        ) : (
                          <Users aria-hidden="true" className="w-3 h-3 text-marinho/50" weight="bold" />
                        )}
                        <span>{modality}</span>
                      </span>
                    </div>

                    {/* Título e Descrição */}
                    <h3 className="text-xl sm:text-2xl font-bold text-marinho tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-marinho/75 leading-relaxed line-clamp-3 mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Rodapé do Card: Dia e Horário */}
                  <div className="pt-4 border-t border-marinho/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-marinho/80 font-medium">
                      <CalendarBlank aria-hidden="true" className="w-4 h-4 text-cobalto" weight="bold" />
                      <span>{scheduleBadge}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-marinho font-bold bg-gelo px-2.5 py-1 rounded-lg">
                      <Clock aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" weight="bold" />
                      <span>{timeRange}</span>
                    </div>
                  </div>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>

        {/* Âncora oculta para suporte a links de transmissões */}
        <div id="lives" className="scroll-mt-20" />
      </div>
    </section>
  );
}
