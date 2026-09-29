import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLatestLives } from "@/lib/youtube";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { ArrowUpRight, Broadcast, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";

export async function YouTubeSection() {
  const { videos, isLiveNow, source } = await getLatestLives();

  return (
    <section id="lives" className="py-20 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-cobalto uppercase tracking-widest">
                03 / Mensagens e Transmissões
              </span>
              {isLiveNow && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  Ao Vivo Agora
                </span>
              )}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marinho tracking-tight">
              Últimas{" "}
              <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-6xl lg:text-7xl">
                mensagens.
              </span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-marinho/70 text-sm max-w-sm leading-relaxed">
              Reveja nossos cultos de celebração ou acompanhe a Palavra onde estiver pelo YouTube.
            </p>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-cobalto hover:text-[#165eb3] transition-colors shrink-0"
            >
              <span>Canal Oficial</span>
              <ArrowUpRight className="w-4 h-4" weight="bold" />
            </a>
          </div>
        </div>

        {/* Grade de Vídeos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => {
            const isVideoLive = video.isLive;

            return (
              <a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full focus:outline-none"
              >
                <Card
                  variant="gelo"
                  elevation={1}
                  className={`flex flex-col h-full p-0 overflow-hidden rounded-2xl border transition-all duration-300 group-hover:shadow-elevation-2 group-hover:-translate-y-1 ${
                    isVideoLive ? "border-red-500/50 ring-2 ring-red-500/20" : "border-marinho/10"
                  }`}
                >
                  {/* Thumbnail do Vídeo com Selo de Destaque */}
                  <div className="relative aspect-video w-full bg-marinho/10 overflow-hidden">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-marinho/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Selos / Badges sobre o Thumbnail */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {isVideoLive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          AO VIVO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-marinho/80 text-white text-[11px] font-medium backdrop-blur-xs">
                          <Broadcast className="w-3.5 h-3.5 text-gelo" />
                          Culto
                        </span>
                      )}

                      <span className="p-1 rounded-full bg-black/40 text-white/80 group-hover:text-white group-hover:bg-red-600 transition-colors">
                        <YoutubeLogo className="w-4 h-4" weight="fill" />
                      </span>
                    </div>
                  </div>

                  {/* Informações Textuais */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-bold text-marinho group-hover:text-cobalto transition-colors line-clamp-2 text-base leading-snug mb-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-xs text-marinho/70 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-marinho/10 flex items-center justify-between text-xs text-marinho/60">
                      <span>Assistir no YouTube</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-cobalto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Fallback card banner amigável se a fonte estiver em modo fallback */}
        {source === "fallback" && (
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gelo border border-marinho/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-marinho/10">
                <YoutubeLogo className="w-6 h-6 text-red-600" weight="fill" />
              </div>
              <div>
                <h4 className="font-bold text-marinho text-base">Acesse nosso canal completo no YouTube</h4>
                <p className="text-xs sm:text-sm text-marinho/70 mt-0.5">
                  Inscreva-se para ser notificado a cada novo culto, transmissão e evento transmitido.
                </p>
              </div>
            </div>
            <Button
              asChild
              href={siteConfig.social.youtube}
              variant="primary"
              size="md"
              className="shrink-0"
            >
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span>Ver no YouTube</span>
                <ArrowUpRight className="w-4 h-4" weight="bold" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
