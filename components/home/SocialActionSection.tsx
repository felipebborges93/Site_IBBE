import React from "react";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export function SocialActionSection() {
  const whatsappPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent("Olá! Gostaria de colaborar com a Ação Social da Igreja Batista Bethel em Resende.");
  const waLink = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

  return (
    <section id="acao-social" className="py-20 lg:py-24 bg-marinho text-white scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Retrato Real Pai e Filha com Cantos Arredondados */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-xl bg-black/20 relative w-full h-[440px] sm:h-[500px]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBcTjw0MLVBf0qtsRCk-CXog-l6nZDns2DI2LLFkCVN1-rs51PkyyjCZgwxfrDTguvWggwgAr-j9EicpoV4QpRviB1ISosIanNBeFKajy8ZTtNV0rKkTGTQKxXQ7Mj1dKNHmkVhtHQxABGthX_6bQi2qsX6el5z_mZSs4TLJAr0psbab4263uk8oMJ1a9GBH52FJPxX6vgNHjcC_kkxY0RbfPx_HlLa9QHkXasFlP8wILxTyr-xEGk"
                alt="Pai e filha sorrindo na comunidade em Resende"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <p className="text-xs text-white/60 mt-3 text-center">
              Ação solidária contínua junto às famílias do bairro Vila Isabel
            </p>
          </div>

          {/* Citação Gigante Editorial & Estatísticas Limpas */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold text-ceu uppercase tracking-widest block mb-4">
                07 / Amor em Ação
              </span>
              <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
                &ldquo;A igreja só tem sentido quando se faz presente na dor do{" "}
                <span className="font-script text-ceu italic font-extrabold text-4xl sm:text-5xl lg:text-6xl">
                  vizinho.
                </span>
                &rdquo;
              </blockquote>
            </div>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
              Nosso ministério de ação social atende mensalmente famílias em vulnerabilidade em Vila Isabel e bairros
              vizinhos em Resende, entregando alimentos, dignidade, respeito e acompanhamento fraterno sem qualquer
              contrapartida.
            </p>

            {/* Estatísticas com Linhas Finas (Sem caixas) */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-ceu tracking-tight block">+3.200</span>
                <span className="text-xs text-white/70 uppercase tracking-wider block mt-1">Cestas doadas</span>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-ceu tracking-tight block">+120</span>
                <span className="text-xs text-white/70 uppercase tracking-wider block mt-1">Famílias fixas</span>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-verde tracking-tight block">24 anos</span>
                <span className="text-xs text-white/70 uppercase tracking-wider block mt-1">Servindo a cidade</span>
              </div>
            </div>

            {/* Botão CTA para voluntariado ou doações */}
            <div className="pt-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Quero ajudar este trabalho pelo WhatsApp (abre em nova aba)"
                className="inline-flex items-center gap-2 px-8 min-h-[44px] h-12 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg motion-reduce:transition-none"
              >
                <WhatsappLogo aria-hidden="true" className="w-4 h-4" weight="bold" />
                <span>Quero ajudar este trabalho</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
