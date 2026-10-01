import React from "react";
import { siteConfig } from "@/content/site";
import { CopyPixButton } from "./CopyPixButton";
import { Heart, HandHeart, Sparkle, ShieldCheck, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export function PixSection() {
  const pixKey = siteConfig.contact.pixKey || "04.198.205/0001-84";

  return (
    <section id="contribuir" className="py-20 lg:py-24 max-w-[1440px] mx-auto px-6 lg:px-12 scroll-mt-20">
      <FadeIn>
        <div className="relative rounded-3xl bg-marinho text-white overflow-hidden shadow-elevation-2 border border-white/10">
          {/* Fundo com Pattern da Marca sutil */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "url('/images/patterns/pattern-9.png')", backgroundSize: '360px', backgroundRepeat: 'repeat' }}
          />

          {/* Gradiente sutil nos cantos */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cobalto/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-ceu/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              
              {/* Coluna Esquerda: Mensagem com Propósito e Impacto Real */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-ceu text-xs uppercase tracking-widest font-semibold mb-4">
                    <Sparkle aria-hidden="true" className="w-3.5 h-3.5 text-ceu" weight="fill" />
                    <span>Generosidade &amp; Missões</span>
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Dízimos e Ofertas com{" "}
                    <span className="font-script text-ceu italic font-extrabold text-4xl sm:text-5xl lg:text-6xl">
                      alegria.
                    </span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                  Cada contribuição é um ato voluntário de gratidão e compromisso cristão. Seus recursos mantêm a igreja acolhedora de portas abertas em Vila Isabel e financiam diretamente o atendimento às famílias necessitadas.
                </p>

                {/* 3 Pilares Transparentes de Destinação */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-cobalto/30 flex items-center justify-center text-ceu mb-2">
                      <HandHeart aria-hidden="true" className="w-4 h-4" weight="bold" />
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Cestas Básicas</h4>
                    <p className="text-micro text-white/70 leading-relaxed">
                      Alimento na mesa de famílias em vulnerabilidade em Resende.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-cobalto/30 flex items-center justify-center text-ceu mb-2">
                      <Heart aria-hidden="true" className="w-4 h-4" weight="bold" />
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Bethel Kids</h4>
                    <p className="text-micro text-white/70 leading-relaxed">
                      Jantar nutritivo e acolhimento para as crianças da comunidade.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-cobalto/30 flex items-center justify-center text-ceu mb-2">
                      <ShieldCheck aria-hidden="true" className="w-4 h-4" weight="bold" />
                    </div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Igreja Viva</h4>
                    <p className="text-micro text-white/70 leading-relaxed">
                      Manutenção, cultos presenciais e infraestrutura aberta a todos.
                    </p>
                  </div>
                </div>

                {/* Citação Bíblica */}
                <div className="pt-2 text-xs sm:text-sm text-white/60 italic border-t border-white/10 flex items-center gap-2">
                  <span>&ldquo;Cada um dê conforme determinou em seu coração, não com tristeza ou por obrigação, pois Deus ama quem dá com alegria.&rdquo;</span>
                  <span className="font-semibold text-ceu not-italic shrink-0">— 2 Co 9:7</span>
                </div>
              </div>

              {/* Coluna Direita: Card Destacado do PIX (Branco Luminoso com Elevação) */}
              <div className="lg:col-span-5 w-full">
                <div className="p-6 sm:p-8 rounded-3xl bg-white text-marinho shadow-xl border border-marinho/10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-cobalto/10 flex items-center justify-center text-cobalto mb-3">
                    <Sparkle aria-hidden="true" className="w-6 h-6" weight="duotone" />
                  </div>

                  <span className="text-xs uppercase tracking-widest font-bold text-cobalto">
                    Chave PIX Oficial
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-marinho mt-1 mb-2">
                    Faça sua contribuição
                  </h3>
                  <p className="text-xs text-marinho/70 mb-5 leading-relaxed">
                    Você pode usar o aplicativo do seu banco para transferir dízimos ou ofertas missionárias via PIX.
                  </p>

                  {/* Bloco Chave PIX Destacada */}
                  <div className="w-full p-4 rounded-2xl bg-gelo border border-marinho/10 text-center mb-5">
                    <span className="text-micro uppercase font-bold text-marinho/60 block mb-1">
                      Chave CNPJ da Igreja
                    </span>
                    <div className="font-mono text-base sm:text-lg font-extrabold text-marinho tracking-wider select-all">
                      {pixKey}
                    </div>
                    <span className="text-micro text-marinho/50 block mt-1">
                      {siteConfig.name}
                    </span>
                  </div>

                  {/* Botão de Copiar PIX */}
                  <div className="w-full flex justify-center mb-4">
                    <CopyPixButton pixKey={pixKey} />
                  </div>

                  {/* Indicador de Segurança */}
                  <div className="flex items-center gap-1.5 text-micro text-marinho/60 font-medium pt-2 border-t border-marinho/10 w-full justify-center">
                    <CheckCircle aria-hidden="true" className="w-3.5 h-3.5 text-verde" weight="bold" />
                    <span>Conta jurídica institucional • 100% segura</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
