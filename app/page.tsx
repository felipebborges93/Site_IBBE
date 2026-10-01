import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { YouTubeSection } from "@/components/youtube/YouTubeSection";
import { HistorySection } from "@/components/home/HistorySection";
import { EventsSection } from "@/components/home/EventsSection";
import { GroupsSection } from "@/components/home/GroupsSection";
import { MinistriesSection } from "@/components/home/MinistriesSection";
import { SocialActionSection } from "@/components/home/SocialActionSection";
import { VisitSection } from "@/components/home/VisitSection";
import { LocationSection } from "@/components/home/LocationSection";
import { PixSection } from "@/components/home/PixSection";
import { PrayerSection } from "@/components/home/PrayerSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { getLatestLives } from "@/lib/youtube";

export default async function Home() {
  const { liveVideoUrl, isLiveNow } = await getLatestLives();

  return (
    <div className="w-full">
      {/* 1. Hero Fiel ao Stitch com Mosaico e NextServiceBar */}
      <Hero liveVideoUrl={liveVideoUrl} isLiveNow={isLiveNow} />

      {/* Divisor Onda para Gelo */}
      <SectionDivider variant="wave" to="gelo" />

      {/* 01. Cultos e EBD com Destaque Dinâmico (#cultos) */}
      <ServicesSection />

      {/* Divisor Diagonal para Branco */}
      <SectionDivider variant="diagonal" to="white" />

      {/* 02. Transmissões e Últimas Mensagens do YouTube (#lives) */}
      <YouTubeSection />

      {/* Divisor Arc para Gelo */}
      <SectionDivider variant="arc" to="gelo" />

      {/* 03. Nossa História (#historia) */}
      <HistorySection />

      {/* Divisor Arc para Gelo */}
      <SectionDivider variant="arc" to="gelo" />

      {/* 04. Próximos Encontros / Eventos (#eventos) */}
      <EventsSection />

      {/* Divisor Diagonal para Branco */}
      <SectionDivider variant="diagonal" to="white" />

      {/* 05. Pequenos Grupos nos Lares / PGMs (#grupos) */}
      <GroupsSection />

      {/* Divisor Wave para Gelo */}
      <SectionDivider variant="wave" to="gelo" />

      {/* 06. Nossos Ministérios (#ministerios) */}
      <MinistriesSection />

      {/* 07. Amor em Ação / Ação Social (#acao-social) em bloco escuro contrastante */}
      <SocialActionSection />

      {/* Divisor Diagonal para Gelo */}
      <SectionDivider variant="diagonal" to="gelo" />

      {/* Pedidos de Oração (#oracao) */}
      <PrayerSection />

      {/* Divisor Arc para Branco */}
      <SectionDivider variant="arc" to="white" />

      {/* 08. Planeje sua Visita e FAQ Interativo (#visita) */}
      <VisitSection />

      {/* Divisor Arc para Gelo */}
      <SectionDivider variant="arc" to="gelo" />

      {/* 09. Localização e Contato (#contato) */}
      <LocationSection />

      {/* 10. Chave PIX e Contribuição (#contribuir) */}
      <PixSection />
    </div>
  );
}
