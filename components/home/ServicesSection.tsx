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
              02 / Encontros Semanais
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
            let timeRange = `${item.time} às ${item.id === "ebd" ? "10h15" : item.id === "celebracao" ? "20h30" : "20h45"}`;

            if (item.id === "celebracao") {
              scheduleBadge = "Domingo Noite";
              note = "Ministério Infantil (Bethel Kids) ativo";
              modality = "Presencial & Live";
            } else if (item.id === "ebd") {
              scheduleBadge = "Domingo Manhã";
              note = "Café com pão compartilhado a partir das 08h30";
              modality = "Presencial";
            } else if (item.id === "oracao") {
              scheduleBadge = "Quinta-feira Noite";
              note = "Momento de oração por pedidos pessoais";
              modality = "Presencial";
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-verde/15 text-verde text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-verde animate-pulse" />
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
                      <VideoCamera className="w-3.5 h-3.5 text-cobalto" weight="bold" />
                    ) : (
                      <Users className="w-3.5 h-3.5 text-marinho/50" weight="bold" />
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
