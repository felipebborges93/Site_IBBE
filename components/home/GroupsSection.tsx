import React from "react";
import { groups } from "@/content/groups";
import { siteConfig } from "@/content/site";
import { WhatsappLogo, ArrowRight, Coffee } from "@phosphor-icons/react/dist/ssr";

export function GroupsSection() {
  const defaultPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");

  return (
    <section id="grupos" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      {/* Cabeçalho da Seção */}
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
          A igreja acontecendo na sala das casas durante a semana: cafezinho, conversa honesta e oração.
        </p>
      </div>

      {/* Bloco Editorial Intimista: Frase de Destaque */}
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
            "Olá! Gostaria de conhecer um Pequeno Grupo (PGM) da IBBE em Resende."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com líder do grupo no WhatsApp (abre na nova aba)"
          className="px-8 h-12 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 min-h-[44px] py-2 transition-all shrink-0 shadow-xs hover:shadow"
        >
          <WhatsappLogo className="w-4 h-4" weight="bold" aria-hidden="true" />
          <span>Encontrar meu grupo</span>
        </a>
      </div>

      {/* Lista Tipográfica Pura por Bairros (Grid 3 colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {groups.map((group) => {
          const groupPhone = (group.contactPhone ? group.contactPhone.replace(/\D/g, "") : "") || defaultPhone;
          const encodedMessage = encodeURIComponent(
            `Olá! Gostaria de participar do Pequeno Grupo no bairro ${group.neighborhood} da IBBE.`
          );
          const whatsappUrl = `https://wa.me/${groupPhone}?text=${encodedMessage}`;

          return (
            <div key={group.id} className="border-t border-marinho/15 pt-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cobalto uppercase tracking-wider block mb-1">
                  {group.neighborhood}
                </span>
                <h3 className="text-2xl font-bold text-marinho">{group.name}</h3>
                <p className="text-xs text-marinho/60 mt-1 font-medium">
                  {group.meetingDay} às {group.meetingTime} • {group.neighborhood}
                </p>
                <p className="text-sm text-marinho/75 mt-3 leading-relaxed">{group.description}</p>
              </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Falar com líder do grupo ${group.name} no WhatsApp (abre em nova aba)`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cobalto hover:text-marinho transition-colors motion-reduce:transition-none group min-h-[44px] py-2"
                >
                  <WhatsappLogo aria-hidden="true" className="w-4 h-4" weight="bold" />
                  <span>Falar com líder pelo WhatsApp</span>
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform motion-reduce:transition-none motion-reduce:transform-none group-hover:translate-x-1" weight="bold" />
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
