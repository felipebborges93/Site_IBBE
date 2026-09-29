import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HistorySection } from "@/components/home/HistorySection";
import { EventsSection } from "@/components/home/EventsSection";
import { GroupsSection } from "@/components/home/GroupsSection";
import { MinistriesSection } from "@/components/home/MinistriesSection";
import { SocialActionSection } from "@/components/home/SocialActionSection";
import { VisitSection } from "@/components/home/VisitSection";
import { LocationSection } from "@/components/home/LocationSection";
import { PixSection } from "@/components/home/PixSection";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Fiel ao Stitch com Mosaico e NextServiceBar */}
      <Hero />

      {/* Divisor Onda para Gelo */}
      <SectionDivider variant="wave" to="gelo" />

      {/* 2. Cultos e EBD com Destaque Dinâmico (#cultos e #lives) */}
      <ServicesSection />

      {/* Divisor Diagonal para Branco */}
      <SectionDivider variant="diagonal" to="white" />

      {/* 3. Nossa História (#historia) */}
      <HistorySection />

      {/* Divisor Arc para Gelo */}
      <SectionDivider variant="arc" to="gelo" />

      {/* 4. Próximos Encontros / Eventos (#eventos) */}
      <EventsSection />

      {/* Divisor Diagonal para Branco */}
      <SectionDivider variant="diagonal" to="white" />

      {/* 5. Pequenos Grupos nos Lares / PGMs (#grupos) */}
      <GroupsSection />

      {/* Divisor Wave para Gelo */}
      <SectionDivider variant="wave" to="gelo" />

      {/* 6. Nossos Ministérios (#ministerios) */}
      <MinistriesSection />

      {/* 7. Amor em Ação / Ação Social (#acao-social) em bloco escuro contrastante */}
      <SocialActionSection />

      {/* Âncora reservada para Pedidos de Oração (Fase 5) */}
      <div id="oracao" className="scroll-mt-20" />

      {/* 8. Planeje sua Visita e FAQ Interativo (#visita) */}
      <VisitSection />

      {/* Divisor Arc para Gelo */}
      <SectionDivider variant="arc" to="gelo" />

      {/* 9. Localização e Contato (#contato) */}
      <LocationSection />

      {/* 10. Chave PIX e Contribuição (#contribuir) */}
      <PixSection />
    </div>
  );
}
