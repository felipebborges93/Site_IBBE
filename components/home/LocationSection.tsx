import React from "react";
import { siteConfig } from "@/content/site";
import { AddressActions } from "./AddressActions";

export function LocationSection() {
  const fullAddress = `${siteConfig.location.address}, ${siteConfig.location.neighborhood}, ${siteConfig.location.city} - ${siteConfig.location.state}, CEP ${siteConfig.location.cep}`;

  return (
    <section id="contato" className="py-20 lg:py-24 bg-gelo-light border-y border-marinho/10 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold text-cobalto uppercase tracking-widest block mb-2">
              09 / Onde Estamos
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
              Venha nos{" "}
              <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                conhecer.
              </span>
            </h2>
          </div>
          <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
            No coração de Vila Izabel, com acesso rápido para toda a região de Resende.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Mapa do Google com Cantos Arredondados */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-marinho/15 min-h-[420px] relative bg-white shadow-xs">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14738.562725515286!2d-44.4608383!3d-22.4646194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9e7943d0e74b3f%3A0x67efc4644a04d221!2sVila%20Isabel%2C%20Resende%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa da Igreja Batista Bethel em Vila Izabel Resende"
              allowFullScreen
            />
          </div>

          {/* Dados de Contato Diretos com Linhas Finas */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-b border-marinho/15 pb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-marinho/60 block mb-1">
                Endereço da capela
              </span>
              <h3 className="text-2xl font-bold text-marinho">{siteConfig.name}</h3>
              <p className="text-sm text-marinho/80 mt-2 leading-relaxed">
                {siteConfig.location.address} (próximo à pracinha)
                <br />
                {siteConfig.location.neighborhood}, {siteConfig.location.city} – {siteConfig.location.state} • CEP{" "}
                {siteConfig.location.cep}
              </p>
            </div>

            <div className="border-b border-marinho/15 pb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-marinho/60 block mb-1">
                Contato Fraterno
              </span>
              <p className="text-base font-bold text-marinho">{siteConfig.contact.phone}</p>
              <p className="text-xs text-marinho/70 mt-0.5">{siteConfig.contact.email}</p>
            </div>

            <div className="border-b border-marinho/15 pb-6">
              <span className="text-xs uppercase tracking-wider font-semibold text-marinho/60 block mb-1">
                Horário das Celebrações
              </span>
              <p className="text-sm text-marinho/80 leading-relaxed">
                Domingos: 08h30 (Manhã), 10h (EBD) e 18h (Noite)
                <br />
                Quintas: 19h30 (Bethel Kids)
                <br />
                Durante a semana: Pequenos Grupos (PGMs)
              </p>
            </div>

            <AddressActions address={fullAddress} />
          </div>
        </div>
      </div>
    </section>
  );
}
