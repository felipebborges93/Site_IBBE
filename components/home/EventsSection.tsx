"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { events, type Event } from "@/content/events";
import { CalendarBlank, MapPin, Clock, ArrowRight, Tag } from "@phosphor-icons/react";

const categoryLabels: Record<Event["category"], string> = {
  aniversario: "Aniversário",
  social: "Comunhão & Almoço",
  especial: "Celebração Especial",
  conferencia: "Conferência",
  retiro: "Retiro",
};

export function EventsSection() {
  const [selectedMonth, setSelectedMonth] = useState<string>("todos");

  // Identifica meses disponíveis e suas contagens
  const monthFilters = useMemo(() => {
    return [
      { id: "todos", label: "Todos os eventos", count: events.length },
      {
        id: "out",
        label: "Outubro",
        count: events.filter((e) => e.monthLabel.includes("OUT")).length,
      },
      {
        id: "nov",
        label: "Novembro",
        count: events.filter((e) => e.monthLabel.includes("NOV")).length,
      },
      {
        id: "dez",
        label: "Dezembro",
        count: events.filter((e) => e.monthLabel.includes("DEZ")).length,
      },
    ];
  }, []);

  // Filtra os eventos de acordo com a seleção
  const filteredEvents = useMemo(() => {
    if (selectedMonth === "todos") return events;
    if (selectedMonth === "out") return events.filter((e) => e.monthLabel.includes("OUT"));
    if (selectedMonth === "nov") return events.filter((e) => e.monthLabel.includes("NOV"));
    if (selectedMonth === "dez") return events.filter((e) => e.monthLabel.includes("DEZ"));
    return events;
  }, [selectedMonth]);

  return (
    <section id="eventos" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
        <div>
          <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
            04 / Calendário Comunitário
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
            Próximos{" "}
            <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
              encontros.
            </span>
          </h2>
        </div>
        <p className="text-marinho/75 text-sm max-w-md leading-relaxed">
          Momentos planejados com carinho para fortalecer a comunhão, missões e adoração em nossa igreja.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-gelo border border-marinho/10 text-center max-w-2xl mx-auto">
          <CalendarBlank aria-hidden="true" className="w-12 h-12 text-cobalto mx-auto mb-4" weight="duotone" />
          <h3 className="text-xl font-bold text-marinho">Nenhum evento especial no momento</h3>
          <p className="mt-2 text-sm text-marinho/75 leading-relaxed">
            Nossas portas estão abertas em todos os cultos regulares de domingo e quinta-feira. Esperamos por você e sua
            família!
          </p>
          <div className="mt-6">
            <Link
              href="#cultos"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-cobalto text-white text-xs font-bold uppercase tracking-wider hover:bg-cobalto/90 transition-colors"
            >
              <span>Ver horários dos cultos</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" weight="bold" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Barra de Filtros por Mês (Pills táteis) */}
          <div
            role="tablist"
            aria-label="Filtrar eventos por mês"
            className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"
          >
            {monthFilters.map((tab) => {
              const isActive = selectedMonth === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedMonth(tab.id)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-full text-xs font-semibold tracking-wide transition-all motion-reduce:transition-none cursor-pointer shrink-0 flex items-center gap-2 ${
                    isActive
                      ? "bg-cobalto text-white shadow-xs"
                      : "bg-gelo text-marinho/80 hover:bg-marinho/10 hover:text-marinho"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-micro font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-white text-marinho/70"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grade Responsiva de Eventos (2 colunas equilibradas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredEvents.map((event, index) => {
              const isFirst = index === 0 && selectedMonth === "todos";
              const isAnniversary = event.category === "aniversario";

              return (
                <article
                  key={event.id}
                  className={`p-6 sm:p-7 rounded-3xl bg-white border transition-all duration-200 motion-reduce:transition-none flex flex-col justify-between group relative overflow-hidden ${
                    isAnniversary
                      ? "border-cobalto/30 shadow-elevation-1 hover:shadow-elevation-2 bg-gradient-to-br from-white via-white to-gelo-light"
                      : "border-marinho/10 shadow-xs hover:border-cobalto/25 hover:shadow-elevation-1"
                  }`}
                >
                  {/* Topo do Card: Bloco de Data e Badges de Categoria */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      {/* Bloco de Data Visual */}
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-3xl sm:text-4xl font-black text-marinho tracking-tight group-hover:text-cobalto transition-colors motion-reduce:transition-none">
                          {event.dayNumber}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-cobalto">
                          {event.monthLabel}
                        </span>
                      </div>

                      {/* Tag de Categoria e Destaque */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {isFirst && (
                          <span className="px-2.5 py-1 rounded-full bg-verde/15 text-verde text-micro font-bold tracking-wide">
                            Próximo
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gelo text-marinho/80 text-micro font-semibold">
                          <Tag aria-hidden="true" className="w-3 h-3 text-cobalto" />
                          {categoryLabels[event.category] || "Evento"}
                        </span>
                      </div>
                    </div>

                    {/* Título do Evento */}
                    <h3 className="text-xl sm:text-2xl font-bold text-marinho group-hover:text-cobalto transition-colors motion-reduce:transition-none leading-snug">
                      {event.title}
                    </h3>

                    {/* Descrição Contextual */}
                    <p className="text-sm text-marinho/75 mt-2.5 leading-relaxed font-normal">
                      {event.description}
                    </p>
                  </div>

                  {/* Rodapé do Card: Metadados Estruturados */}
                  <div className="mt-6 pt-4 border-t border-marinho/10 flex flex-wrap items-center justify-between gap-3 text-xs text-marinho/65">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-medium">
                      {event.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock aria-hidden="true" className="w-4 h-4 text-cobalto shrink-0" />
                          <span>{event.time}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="w-4 h-4 text-cobalto shrink-0" />
                        <span className="truncate max-w-[220px] sm:max-w-[260px]">{event.location}</span>
                      </span>
                    </div>

                    <span className="text-verde font-semibold bg-verde/10 px-2.5 py-0.5 rounded-full shrink-0">
                      Entrada franca
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
