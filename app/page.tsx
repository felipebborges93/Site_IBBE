import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Hero } from "@/components/home/Hero";
import { siteConfig, services, groups, historyData } from "@/content";

export default function Home() {
  return (
    <div className="w-full">
      {/* Seção Hero Fiel ao Stitch com Mosaico, Tipografia Editorial e NextServiceBar */}
      <Hero />

      {/* Divisor Onda Branca para Gelo */}
      <SectionDivider variant="wave" to="gelo" />

      {/* Seção Cultos & Transmissões */}
      <Section id="cultos" background="gelo">
        <Container>
          <SectionTitle
            highlight="encontros"
            subtitle="Momentos de louvor, oração e ensino das Sagradas Escrituras para edificar você e sua família."
          >
            Nossos cultos e encontros
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((item) => (
              <Card
                key={item.id}
                variant="white"
                elevation={2}
                rounded="3xl"
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center px-3 py-1 bg-gelo text-cobalto font-bold text-xs rounded-full mb-3">
                    {item.day} às {item.time}
                  </div>
                  <h3 className="text-xl font-bold text-marinho mb-2">{item.title}</h3>
                  <p className="text-sm text-marinho/70 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-marinho/5">
                  <span className="text-xs font-semibold text-cobalto">Entrada livre &bull; Todos bem-vindos</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Âncora secundária para Lives de transmissão */}
          <div id="lives" className="scroll-mt-20 pt-8" />
        </Container>
      </Section>

      {/* Divisor Diagonal Gelo para Branco */}
      <SectionDivider variant="diagonal" to="white" />

      {/* Seção História */}
      <Section id="historia" background="white">
        <Container>
          <SectionTitle
            highlight="história"
            subtitle={historyData.themeVerse.verse + " (" + historyData.themeVerse.reference + ")"}
          >
            Conheça nossa história
          </SectionTitle>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <Card variant="gelo" elevation={1} rounded="3xl">
              <h3 className="text-lg font-bold text-marinho mb-2">Fundação (2000)</h3>
              <p className="text-sm text-marinho/80 leading-relaxed">
                {historyData.foundationText}
              </p>
            </Card>

            <Card variant="white" elevation={2} rounded="3xl">
              <h3 className="text-lg font-bold text-marinho mb-2">A Capela dos 5 Dias (2003)</h3>
              <p className="text-sm text-marinho/80 leading-relaxed">
                {historyData.capelaText}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Divisor Arc Branco para Gelo */}
      <SectionDivider variant="arc" to="gelo" />

      {/* Seção Pequenos Grupos (PGMs) */}
      <Section id="grupos" background="gelo">
        <Container>
          <SectionTitle
            highlight="caminhar"
            subtitle="A igreja nos lares: comunhão, partilha e amizades sólidas nos bairros de Resende."
          >
            Um pequeno grupo para caminhar
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {groups.map((group) => (
              <Card key={group.id} variant="white" elevation={1} rounded="2xl" className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-cobalto block mb-1">
                  {group.neighborhood}
                </span>
                <h4 className="text-lg font-bold text-marinho">{group.name}</h4>
                <p className="text-xs text-marinho/60 mt-1">
                  {group.meetingDay} às {group.meetingTime}
                </p>
              </Card>
            ))}
          </div>

          {/* Âncoras auxiliares para scrollspy completo da Fase 3/4 */}
          <div id="eventos" className="scroll-mt-20" />
          <div id="ministerios" className="scroll-mt-20" />
          <div id="acao-social" className="scroll-mt-20" />
          <div id="oracao" className="scroll-mt-20" />
        </Container>
      </Section>

      {/* Divisor Wave Gelo para Marinho */}
      <SectionDivider variant="wave" to="marinho" />

      {/* Seção Como Chegar / Sou Novo (#visita) e Contato (#contato) */}
      <Section id="visita" background="marinho">
        <Container>
          <SectionTitle
            light
            highlight="esperamos"
            subtitle="Será uma alegria receber você e seus familiares em nosso templo. Venha tomar um café conosco!"
          >
            Nós esperamos por você
          </SectionTitle>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gelo/90 font-medium mb-6">
              {siteConfig.location.address} — {siteConfig.location.neighborhood}, {siteConfig.location.city} - {siteConfig.location.state}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href={siteConfig.location.googleMapsUrl}
                variant="primary"
                size="lg"
                className="bg-cobalto text-white"
              >
                Abrir Rota no Google Maps
              </Button>
            </div>
          </div>

          <div id="contato" className="scroll-mt-20 pt-8" />
        </Container>
      </Section>
    </div>
  );
}
