import React from "react";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { WhatsappLogo, Basket, CookingPot, Compass, HandHeart } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { Parallax } from "@/components/ui/Parallax";

export function SocialActionSection() {
  const whatsappPhone = siteConfig.contact.whatsapp.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent("Olá! Gostaria de colaborar com a Ação Social da Igreja Batista Bethel em Resende.");
  const waLink = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;

  return (
    <section id="acao-social" className="py-20 lg:py-24 bg-marinho text-white scroll-mt-20 relative overflow-hidden">
      {/* Texture Pattern Background */}
      <Parallax offset={80} speed={0.4} className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div 
          className="w-full h-[120%]"
          style={{ backgroundImage: "url('/images/patterns/pattern-9.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
        />
      </Parallax>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Foto Real e Cartão de Apoio */}
          <FadeIn delay={0.1} className="lg:col-span-5 space-y-6">
            <Parallax offset={20} speed={0.8} className="rounded-3xl overflow-hidden border border-white/20 shadow-xl bg-black/20 relative w-full h-[260px] sm:h-[400px] lg:h-[460px]">
              <Image
                src="/images/acao_social.jpg"
                alt="Ação Social na comunidade em Resende"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </Parallax>
            
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-base font-bold text-ceu mb-2">Como você pode participar</h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Você pode ser voluntário em nossas oficinas e atividades com as crianças, doar alimentos não perecíveis para as cestas básicas ou contribuir financeiramente com nossos projetos sociais.
              </p>
              <div className="mt-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Quero ajudar este trabalho pelo WhatsApp (abre em nova aba)"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 min-h-[44px] py-2.5 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg text-center"
                >
                  <WhatsappLogo aria-hidden="true" className="w-4 h-4 shrink-0" weight="bold" />
                  <span>Quero apoiar estes projetos</span>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Coluna Direita: Apresentação dos 4 Projetos Sociais */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn delay={0.15}>
              <div>
                <span className="text-xs font-bold text-ceu uppercase tracking-widest block mb-4">
                  06 / Amor em Ação
                </span>
                <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
                  &ldquo;A igreja só tem sentido quando se faz presente na dor do{" "}
                  <span className="font-script text-ceu italic font-extrabold text-4xl sm:text-5xl lg:text-6xl">
                    vizinho.
                  </span>
                  &rdquo;
                </blockquote>
              </div>

              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                Nosso compromisso social vai além das palavras: cuidamos de famílias, alimentamos quem precisa e investimos no futuro de crianças e adolescentes com amor prático e o Evangelho de Jesus.
              </p>
            </FadeIn>

            {/* Grid dos 4 Projetos */}
            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {/* 1. Cestas Básicas */}
              <FadeInItem className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-cobalto/30 flex items-center justify-center text-ceu mb-3">
                  <Basket className="w-5 h-5" weight="bold" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Distribuição de Cestas Básicas</h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  Assistência contínua a famílias em vulnerabilidade em Vila Isabel e bairros vizinhos de Resende, levando alimento à mesa e suporte fraterno.
                </p>
              </FadeInItem>

              {/* 2. Jantar Bethel Kids */}
              <FadeInItem className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-cobalto/30 flex items-center justify-center text-ceu mb-3">
                  <CookingPot className="w-5 h-5" weight="bold" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Jantar para as Crianças</h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  Após as atividades do Bethel Kids, servimos um jantar quentinho e nutritivo preparado com muito carinho para todas as crianças atendidas.
                </p>
              </FadeInItem>

              {/* 3. Projeto Doce Amor */}
              <FadeInItem className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-cobalto/30 flex items-center justify-center text-ceu mb-3">
                  <HandHeart className="w-5 h-5" weight="bold" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Projeto Doce Amor</h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  Aulas de culinária para meninas aliadas a discipulado bíblico, acolhimento, desenvolvimento de habilidades e evangelização.
                </p>
              </FadeInItem>

              {/* 4. Embaixadores do Rei */}
              <FadeInItem className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-cobalto/30 flex items-center justify-center text-ceu mb-3">
                  <Compass className="w-5 h-5" weight="bold" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Embaixadores do Rei</h4>
                <p className="text-xs text-white/75 leading-relaxed">
                  Organização missionária batista para meninos de 9 a 17 anos focada em desenvolvimento físico, moral e espiritual, estudo da Bíblia, missões e serviço.
                </p>
              </FadeInItem>
            </FadeInStagger>
          </div>
        </div>
      </div>
    </section>
  );
}
