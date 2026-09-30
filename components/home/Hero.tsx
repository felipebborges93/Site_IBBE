import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NextServiceBar } from "./NextServiceBar";
import { services } from "@/content/services";

export interface HeroProps {
  liveVideoUrl?: string;
  isLiveNow?: boolean;
}

export function Hero({ liveVideoUrl, isLiveNow }: HeroProps) {
  const liveUrl = liveVideoUrl || "#lives";
  const isExternalLive = Boolean(liveVideoUrl);
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] pt-12 sm:pt-16 lg:pt-20 pb-0 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white/70 via-gelo-light/85 to-gelo/40"
    >
      <Container size="xl" className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-6 sm:py-10">
          {/* Coluna Esquerda: Conteúdo Editorial e CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Badge de boas-vindas */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/80 border border-marinho/10 shadow-sm backdrop-blur-sm">
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-verde animate-pulse motion-reduce:animate-none shrink-0" />
              <span className="text-xs uppercase tracking-widest font-semibold text-marinho/80">
                Vila Isabel, Resende • Venha como você está
              </span>
            </div>

            {/* Título Principal Editorial */}
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold text-marinho tracking-tight leading-[1.03] mb-6">
              Uma igreja feita de{" "}
              <span className="font-script-accent text-cobalto italic font-extrabold text-5xl sm:text-7xl lg:text-[88px] inline-block -rotate-1">
                pessoas.
              </span>
            </h1>

            {/* Subtítulo Acolhedor */}
            <p className="text-lg sm:text-xl text-marinho/80 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              Aqui ninguém caminha só. Venha fazer parte da nossa família em Vila Isabel, Resende.
            </p>

            {/* Bloco de Ações CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#visita"
                className="inline-flex items-center justify-center px-8 sm:px-10 h-14 rounded-full bg-cobalto hover:bg-cobalto/85 text-white font-bold text-base tracking-wide transition-all shadow-md hover:scale-[1.02] active:scale-95 motion-reduce:transition-none motion-reduce:transform-none"
              >
                Planeje sua visita
              </Link>
              {isExternalLive ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Assistir ao vivo no YouTube (abre na nova aba)"
                  className="inline-flex items-center gap-2 justify-center px-6 sm:px-8 h-14 rounded-full bg-verde hover:bg-verde/90 text-white font-bold text-base transition-all shadow-md hover:scale-[1.02] active:scale-95 animate-pulse motion-reduce:animate-none motion-reduce:transition-none motion-reduce:transform-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping motion-reduce:animate-none" />
                  <span>Assistir ao vivo</span>
                </a>
              ) : (
                <Link
                  href={liveUrl}
                  className="inline-flex items-center justify-center px-6 sm:px-8 h-14 rounded-full bg-white/80 hover:bg-white text-marinho font-semibold text-base border border-marinho/15 transition-all shadow-sm hover:scale-[1.02] active:scale-95"
                >
                  Assistir ao vivo
                </Link>
              )}
            </div>
          </div>

          {/* Coluna Direita: Mosaico Fotográfico Assimétrico */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
            {/* Foto Principal (Família reunida) */}
            <div className="w-[82%] sm:w-[78%] rounded-3xl overflow-hidden border-4 border-white shadow-elevation-2 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform motion-reduce:transform-none motion-reduce:transition-none duration-300">
              <div className="relative w-full h-72 sm:h-84 md:h-96">
                <Image
                  src="https://lh3.googleusercontent.com/aida/AEtjO1VSGtMBUe7IfJXHWFl_Mow4VMJKqrNgmxT1WKKx9dukdEOgB7sBsohq1QpW7ihIX6i5f1xBq233G_MKoGhgLPZ6qY26peMK0oIo_tdIN5HtYmoeFQQBYDQ_9St3ZOvAzDpBR3VETMKbOnlc7DyXYIvy-TOfWFbRYQCMAok8lrvz5K8G-WJNBnXSEJunLk1GDVkqAMjRoHwVr9e9-8TBVJA8JzYfEECkCz1nTgVWWYbxTUflFky1nOrAeYE"
                  alt="Família da Igreja Bethel reunida ao ar livre"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Foto Secundária 1 (Pai e filha sorrindo) */}
            <div className="absolute -bottom-4 left-0 sm:left-2 w-44 sm:w-56 rounded-2xl overflow-hidden border-4 border-white shadow-elevation-2 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="relative w-full h-48 sm:h-64">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBcTjw0MLVBf0qtsRCk-CXog-l6nZDns2DI2LLFkCVN1-rs51PkyyjCZgwxfrDTguvWggwgAr-j9EicpoV4QpRviB1ISosIanNBeFKajy8ZTtNV0rKkTGTQKxXQ7Mj1dKNHmkVhtHQxABGthX_6bQi2qsX6el5z_mZSs4TLJAr0psbab4263uk8oMJ1a9GBH52FJPxX6vgNHjcC_kkxY0RbfPx_HlLa9QHkXasFlP8wILxTyr-xEGk"
                  alt="Pai e filha sorrindo na comunidade"
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Foto Secundária 2 (Senhora afetuosa) */}
            <div className="absolute -top-4 right-0 sm:right-2 w-40 sm:w-52 rounded-2xl overflow-hidden border-4 border-white shadow-elevation-2 z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="relative w-full h-40 sm:h-52">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1vSXrtt6ziA9Hdx05vEowXs_70oK7m0L7dNIqityk92K3n6qwzX184SSqrcaVe4dOeU1EaimUyhWllH1cQggg33ljEmsFw79Q-n7c43qNyuU46-_ONffOzDsurpOOiAmDWLLMUv44ML1VZtkJm7d-8Z-r34xgVuks745Do-RS-RVSu9GNpyajwUzmrkw00H470A5zDcHv84s-uT6TnnU1KG1tUW-WZFOUw6g2m-TXXQc0cdlNe_H1"
                  alt="Senhora acolhedora da comunidade Bethel"
                  fill
                  sizes="(max-width: 768px) 40vw, 18vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Faixa Inferior de Próximo Culto */}
      <NextServiceBar services={services} />
    </section>
  );
}
