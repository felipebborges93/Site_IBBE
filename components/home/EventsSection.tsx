import React from "react";
import Link from "next/link";
import { events } from "@/content/events";
import { CalendarBlank, MapPin, Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function EventsSection() {
  return (
    <section id="eventos" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
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
        <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cobalto text-white text-xs font-bold uppercase tracking-wider hover:bg-cobalto/90 transition-colors"
            >
              <span>Ver horários dos cultos</span>
              <ArrowRight aria-hidden="true" className="w-4 h-4" weight="bold" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Visualização Desktop: Lista Horizontal Tipográfica alinhada ao Stitch sem botão de confirmação */}
          <div className="hidden md:block border-t border-marinho/15 divide-y divide-marinho/15">
            {events.map((event) => (
              <div key={event.id} className="py-7 grid grid-cols-12 gap-8 items-center group">
                <div className="col-span-2 flex items-baseline gap-3">
                  <span className="text-4xl font-black text-marinho group-hover:text-cobalto transition-colors">
                    {event.dayNumber}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-cobalto">
                    {event.monthLabel}
                  </span>
                </div>

                <div className="col-span-7">
                  <h3 className="text-2xl font-bold text-marinho group-hover:text-cobalto transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-marinho/75 mt-1 leading-relaxed">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-marinho/60 mt-2 font-medium">
                    {event.time && (
                      <>
                        <span className="flex items-center gap-1">
                          <Clock aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                          {event.time}
                        </span>
                        <span>•</span>
                      </>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                      {event.location}
                    </span>
                    <span>•</span>
                    <span className="text-verde font-semibold">Entrada franca</span>
                  </div>
                </div>

                <div className="col-span-3 flex justify-end">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-gelo text-marinho/80 text-xs font-semibold">
                    {event.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Visualização Mobile: Cards Touch Snap */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 no-scrollbar">
            {events.map((event) => (
              <div
                key={event.id}
                className="snap-start shrink-0 w-[84vw] max-w-[320px] p-6 rounded-3xl bg-white border border-marinho/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-gelo text-cobalto font-bold text-xs uppercase tracking-wider">
                      {event.date}
                    </span>
                    <span className="text-micro text-verde">Aberto ao público</span>
                  </div>

                  <h3 className="text-xl font-bold text-marinho leading-snug">{event.title}</h3>
                  <p className="text-xs text-marinho/75 mt-2 leading-relaxed">{event.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-marinho/10">
                  <div className="space-y-1 text-xs text-marinho/60">
                    {event.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
