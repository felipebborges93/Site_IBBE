import React from "react";
import { services } from "@/content/services";
import { calculateNextService } from "@/lib/utils/services";
import { Sparkle, VideoCamera, Users } from "@phosphor-icons/react/dist/ssr";

export function ServicesSection() {
  const nextServiceResult = calculateNextService(services);

  return (
    <section id="cultos" className="py-20 lg:py-24 bg-gelo-light border-y border-marinho/10 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              01 / Encontros Semanais
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
              Cultos e{" "}
              <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                presença.
              </span>
            </h2>
          </div>
          <p className="text-marinho/70 text-sm max-w-md leading-relaxed">
            Sem formalidades desnecessárias. Um ambiente sereno para desacelerar da rotina, orar e ouvir a Palavra.
          </p>
        </div>

        {/* Lista Editorial Limpa */}
        <div className="divide-y divide-marinho/15 border-y border-marinho/15">
          {services.map((item, index) => {
            const isNext = item.id === nextServiceResult.service.id;
            const numberLabel = `0${index + 1}`;

            // Metadados contextuais adicionais fiéis ao Stitch
            let scheduleBadge = item.time;
            let note = "Entrada livre • Todos bem-vindos";
            let modality = "Presencial";
            let timeRange = "";
            if (item.id === "culto-manha") {
              scheduleBadge = "Domingo Manhã";
              note = "Entrada livre • Todos bem-vindos";
              modality = "Presencial & Live";
              timeRange = "08:30 às 10:00";
            } else if (item.id === "ebd") {
              scheduleBadge = "Domingo";
              note = "Classes para todas as idades";
              modality = "Presencial";
              timeRange = "10:00 às 11:00";
            } else if (item.id === "culto-noite") {
              scheduleBadge = "Domingo Noite";
              note = "Entrada livre • Todos bem-vindos";
              modality = "Presencial & Live";
              timeRange = "18:00 às 19:30";
            } else if (item.id === "bethel-kids") {
              scheduleBadge = "Quinta-feira Noite";
              note = "Ministério Infantil na Igreja";
              modality = "Presencial";
              timeRange = "19:30 às 21:00";
            } else if (item.id === "pgm") {
              scheduleBadge = "Durante a semana";
              note = "Nos lares";
              modality = "Presencial";
              timeRange = "Vários horários";
            }

            return (
              <div
                key={item.id}
                className={`py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors ${
                  isNext ? "bg-white/70 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl shadow-xs" : ""
                }`}
              >
                {/* Numeração e Dia */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-3xl font-extrabold ${
                        isNext ? "text-cobalto" : "text-marinho/40"
                      }`}
                    >
                      {numberLabel}
                    </span>
                    {isNext && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-verde/15 text-verde text-micro">
                        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-verde animate-pulse motion-reduce:animate-none" />
                        Próximo
                      </span>
                    )}
                  </div>
                  <span className="block text-xs uppercase tracking-widest text-marinho/60 font-semibold mt-1">
                    {scheduleBadge}
                  </span>
                </div>

                {/* Conteúdo Central */}
                <div className="md:col-span-5">
                  <h3 className="text-2xl sm:text-3xl font-bold text-marinho flex items-center gap-2">
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-sm text-marinho/75 mt-2 leading-relaxed">{item.description}</p>
                </div>

                {/* Horário e Nota Contextual */}
                <div className="md:col-span-3">
                  <div className="text-2xl font-bold text-marinho">{timeRange}</div>
                  <span
                    className={`text-xs font-semibold block mt-1 ${
                      item.id === "celebracao" ? "text-verde" : "text-marinho/60"
                    }`}
                  >
                    {note}
                  </span>
                </div>

                {/* Tag de Modalidade */}
                <div className="md:col-span-2 text-left md:text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                      modality.includes("Live")
                        ? "text-cobalto bg-white border-cobalto/25"
                        : "text-marinho/70 bg-white border-marinho/15"
                    }`}
                  >
                    {modality.includes("Live") ? (
                      <VideoCamera aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" weight="bold" />
                    ) : (
                      <Users aria-hidden="true" className="w-3.5 h-3.5 text-marinho/50" weight="bold" />
                    )}
                    <span>{modality}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Âncora oculta para suporte a links de transmissões */}
        <div id="lives" className="scroll-mt-20" />
      </div>
    </section>
  );
}
