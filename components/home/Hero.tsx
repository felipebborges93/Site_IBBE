"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { NextServiceBar } from "./NextServiceBar";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

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
      {/* Texture Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/images/patterns/pattern-10.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
      />
      
      <Container size="xl" className="flex-1 flex flex-col justify-center relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-6 sm:py-10">
          {/* Coluna Esquerda: Conteúdo Editorial e CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Badge de boas-vindas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/80 border border-marinho/10 shadow-sm backdrop-blur-sm"
            >
              <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-verde animate-pulse shrink-0" />
              <span className="text-xs uppercase tracking-widest font-semibold text-marinho/80">
                {siteConfig.location.neighborhood}, {siteConfig.location.city} • Venha como você está
              </span>
            </motion.div>

            {/* Título Principal Editorial */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-hero-display text-marinho mb-6"
            >
              Uma igreja feita de{" "}
              <span className="font-script-accent text-cobalto italic inline-block -rotate-1 text-[1.05em]">
                pessoas.
              </span>
            </motion.h1>

            {/* Subtítulo Acolhedor */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg sm:text-xl text-marinho/80 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10"
            >
              Aqui ninguém caminha só. Venha fazer parte da nossa família!
            </motion.p>

            {/* Bloco de Ações CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Link
                href="#contato"
                className="inline-flex items-center justify-center px-8 sm:px-10 h-14 rounded-full bg-cobalto hover:bg-cobalto/85 text-white font-bold text-base tracking-wide transition-all shadow-md hover:scale-[1.02] active:scale-95 text-center"
              >
                Venha nos Visitar
              </Link>
              {isExternalLive ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 justify-center px-6 sm:px-8 h-14 rounded-full bg-verde hover:bg-verde/90 text-white font-bold text-base transition-all shadow-md hover:scale-[1.02] active:scale-95 text-center"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span>Assistir ao vivo</span>
                </a>
              ) : (
                <Link
                  href={liveUrl}
                  className="inline-flex items-center justify-center px-6 sm:px-8 h-14 rounded-full bg-white/80 hover:bg-white text-marinho font-semibold text-base border border-marinho/15 transition-all shadow-sm hover:scale-[1.02] active:scale-95 text-center"
                >
                  Assistir ao vivo
                </Link>
              )}
            </motion.div>
          </div>

          {/* Coluna Direita: Mosaico Fotográfico Assimétrico */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]">
            {/* Foto Principal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-[82%] sm:w-[78%] relative z-10 cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-full rounded-3xl overflow-hidden border-4 border-white shadow-elevation-2"
              >
                <div className="relative w-full h-72 sm:h-84 md:h-96">
                  <Image
                    src="/images/culto_1.jpeg"
                    alt="Família da Igreja Bethel reunida"
                    fill
                    priority
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Foto Secundária 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 left-0 sm:left-2 w-44 sm:w-56 z-20 cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full rounded-2xl overflow-hidden border-4 border-white shadow-elevation-2"
              >
                <div className="relative w-full h-48 sm:h-64">
                  <Image
                    src="/images/culto_2.jpg"
                    alt="Comunidade na Igreja Bethel"
                    fill
                    sizes="(max-width: 768px) 45vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Foto Secundária 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 30, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 right-0 sm:right-2 w-40 sm:w-52 z-20 cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-full rounded-2xl overflow-hidden border-4 border-white shadow-elevation-2"
              >
                <div className="relative w-full h-40 sm:h-52">
                  <Image
                    src="/images/culto_3.jpg"
                    alt="Membros da comunidade Bethel"
                    fill
                    sizes="(max-width: 768px) 40vw, 18vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>

      <NextServiceBar services={services} />
    </section>
  );
}
