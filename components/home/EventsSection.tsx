import React from "react";
import Link from "next/link";
import { events } from "@/content/events";
import { siteConfig } from "@/content/site";
import { CalendarBlank, MapPin, Clock, WhatsappLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function EventsSection() {
  // Lógica defensiva de filtragem de eventos passados
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const futureEvents = events
    .filter((event) => {
      if (event.isoDate) {
        const eventTime = new Date(`${event.isoDate}T23:59:59`).getTime();
        return !isNaN(eventTime) && eventTime >= startOfToday;
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = a.isoDate ? new Date(a.isoDate).getTime() : 0;
      const timeB = b.isoDate ? new Date(b.isoDate).getTime() : 0;
      return timeA - timeB;
    });

  const whatsappPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");

  return (
    <section id="eventos" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
            03 / Calendário Comunitário
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
            Próximos{" "}
            <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
              encontros.
            </span>
          </h2>
        </div>
        <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
          Momentos planejados com carinho para fortalecer a convivência fraterna e acolher novas pessoas.
        </p>
      </div>

      {/* Caso sem eventos futuros: Estado Vazio Acolhedor */}
      {futureEvents.length === 0 ? (
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
          {/* Visualização Desktop: Lista Horizontal Tipográfica alinhada ao Stitch */}
          <div className="hidden md:block border-t border-marinho/15 divide-y divide-marinho/15">
            {futureEvents.map((event) => {
              // Extrair dia e mês para o design tipográfico de calendário
              let dayNumber = "•";
              let monthLabel = "EVENTO";

              if (event.isoDate) {
                const parts = event.isoDate.split("-");
                if (parts.length === 3) {
                  dayNumber = parts[2];
                  const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
                  const mIndex = parseInt(parts[1], 10) - 1;
                  monthLabel = `${monthNames[mIndex]} • SÁB`;
                }
              } else if (event.date) {
                const parts = event.date.split(" ");
                dayNumber = parts[0] || "•";
                monthLabel = parts.slice(1).join(" ").toUpperCase();
              }

              const encodedMsg = encodeURIComponent(
                `Olá! Gostaria de saber mais sobre o evento "${event.title}" da IBBE.`
              );
              const waLink = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

              return (
                <div key={event.id} className="py-8 grid grid-cols-12 gap-8 items-center group">
                  <div className="col-span-2 flex items-baseline gap-3">
                    <span className="text-5xl font-black text-marinho group-hover:text-cobalto transition-colors">
                      {dayNumber}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-cobalto">{monthLabel}</span>
                  </div>

                  <div className="col-span-7">
                    <h3 className="text-2xl font-bold text-marinho group-hover:text-cobalto transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-marinho/75 mt-1 leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-marinho/60 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                        {event.time || "Horário a confirmar"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                        {event.location}
                      </span>
                      <span>•</span>
                      <span className="text-verde font-semibold">Entrada franca</span>
                    </div>
                  </div>

                  <div className="col-span-3 flex justify-end">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Confirmar presença no evento ${event.title} via WhatsApp (abre na nova aba)`}
                      className="px-6 min-h-[44px] py-3 rounded-full border border-cobalto text-cobalto hover:bg-cobalto hover:text-white font-semibold text-xs tracking-wider uppercase transition-all motion-reduce:transition-none inline-flex items-center gap-2 shadow-2xs hover:shadow-xs"
                    >
                      <WhatsappLogo aria-hidden="true" className="w-4 h-4" weight="bold" />
                      <span>Confirmar presença</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visualização Mobile: Carrossel Horizontal Touch Snap */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 no-scrollbar">
            {futureEvents.map((event) => {
              const encodedMsg = encodeURIComponent(
                `Olá! Gostaria de saber mais sobre o evento "${event.title}" da IBBE.`
              );
              const waLink = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

              return (
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
                    <p className="text-xs text-marinho/75 mt-2 leading-relaxed line-clamp-3">{event.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-marinho/10">
                    <div className="space-y-1 text-xs text-marinho/60 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                        <span>{event.time || "A confirmar"}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-cobalto" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Confirmar presença no evento ${event.title} via WhatsApp (abre em nova aba)`}
                      className="w-full min-h-[44px] py-3 rounded-full bg-cobalto hover:bg-cobalto/90 text-white text-xs font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 shadow-2xs transition-colors motion-reduce:transition-none"
                    >
                      <WhatsappLogo aria-hidden="true" className="w-4 h-4" weight="bold" />
                      <span>Confirmar presença</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
