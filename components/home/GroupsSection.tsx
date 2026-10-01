import React from "react";
import { groups } from "@/content/groups";
import { siteConfig } from "@/content/site";
import { WhatsappLogo, ArrowRight, Coffee, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export function GroupsSection() {
  const defaultPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");

  return (
    <section id="grupos" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho da Seção */}
      <FadeIn>
        <div className="border-b border-marinho/15 pb-8 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              05 / Vida Compartilhada
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
              Pequenos Grupos{" "}
              <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                (PGMs).
              </span>
            </h2>
          </div>
          <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
            A igreja acontecendo nos lares e na comunidade durante a semana: cafezinho, conversa honesta e oração.
          </p>
        </div>
      </FadeIn>

      {/* Bloco Editorial Intimista: Frase de Destaque */}
      <FadeIn delay={0.1}>
        <div className="bg-gelo rounded-3xl p-8 sm:p-12 mb-16 border border-marinho/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-cobalto mb-2">
              <Coffee className="w-4 h-4" weight="bold" aria-hidden="true" />
              <span>Ninguém caminha só</span>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-marinho leading-snug">
              &ldquo;Uma mesa posta, café quente e ouvidos atentos para acolher você sem pressa e sem julgamento.&rdquo;
            </p>
          </div>

          <a
            href={`https://wa.me/${defaultPhone}?text=${encodeURIComponent(
              "Olá! Gostaria de saber mais sobre os Pequenos Grupos (PGMs) da IBBE em Resende."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar sobre os grupos no WhatsApp (abre em nova aba)"
            className="w-full sm:w-auto px-8 h-12 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 min-h-[44px] py-2 transition-all shrink-0 shadow-xs hover:shadow text-center"
          >
            <WhatsappLogo className="w-4 h-4 shrink-0" weight="bold" aria-hidden="true" />
            <span>Encontrar meu grupo</span>
          </a>
        </div>
      </FadeIn>

      {/* Lista Tipográfica / Cards de PGMs (Grid responsivo) */}
      <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => {
          const encodedMessage = encodeURIComponent(
            `Olá! Gostaria de participar do PGM ${group.name} da IBBE.`
          );
          const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodedMessage}`;

          return (
            <FadeInItem key={group.id} className="h-full">
              <div
                className="p-6 sm:p-7 rounded-3xl bg-white border border-marinho/10 shadow-xs hover:border-cobalto/30 hover:shadow-elevation-2 hover:-translate-y-1.5 flex flex-col justify-between transition-all duration-300 h-full"
              >
              <div>
                <span className="text-xs font-bold text-cobalto uppercase tracking-wider block mb-1">
                  PGM
                </span>
                <h3 className="text-2xl font-bold text-marinho">{group.name}</h3>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-marinho/75">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-cobalto shrink-0 mt-0.5" weight="bold" aria-hidden="true" />
                    <span>{group.address}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-marinho">
                    <Clock className="w-4 h-4 text-cobalto shrink-0" weight="bold" aria-hidden="true" />
                    <span>{group.meetingSchedule}</span>
                  </div>
                </div>

                {group.description && (
                  <p className="text-xs text-marinho/65 mt-3 leading-relaxed border-t border-marinho/10 pt-3">
                    {group.description}
                  </p>
                )}
              </div>

              <div className="pt-6 mt-4 border-t border-marinho/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Saber mais sobre o PGM ${group.name} no WhatsApp (abre em nova aba)`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cobalto hover:text-marinho transition-colors motion-reduce:transition-none group min-h-[44px] py-1"
                >
                  <WhatsappLogo aria-hidden="true" className="w-4 h-4" weight="bold" />
                  <span>Saber mais no WhatsApp</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 transition-transform motion-reduce:transition-none motion-reduce:transform-none group-hover:translate-x-1"
                    weight="bold"
                  />
                </a>
              </div>
              </div>
            </FadeInItem>
          );
        })}
      </FadeInStagger>
    </section>
  );
}
