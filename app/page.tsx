import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <div className="w-full">
      {/* Seção Branca Inicial */}
      <Section background="white">
        <Container>
          <SectionTitle
            highlight="pessoas"
            subtitle="Conheça a Igreja Batista Bethel em Resende. Um ambiente caloroso, fundamentado na Palavra e comprometido com o Reino."
          >
            Uma igreja feita de pessoas
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <Card
              elevation={1}
              rounded="3xl"
              title="Elevação 1"
              subtitle="Card suave para conteúdos secundários"
            >
              <p className="text-marinho/80 text-sm mb-4">
                Texto de exemplo utilizando a paleta de cores oficial e espaçamento refinado.
              </p>
              <Button variant="primary" size="sm">
                Ação Primária
              </Button>
            </Card>

            <Card
              elevation={2}
              rounded="3xl"
              title="Elevação 2"
              subtitle="Destaque sutil com sombra cobalt-tinted"
            >
              <p className="text-marinho/80 text-sm mb-4">
                Botão secundário e tipografia Bricolage Grotesque em harmonia.
              </p>
              <Button variant="secondary" size="sm">
                Ação Secundária
              </Button>
            </Card>

            <Card
              elevation={3}
              rounded="3xl"
              title="Elevação 3"
              subtitle="Elevação máxima para cards prioritários"
            >
              <p className="text-marinho/80 text-sm mb-4">
                Botão estilo ghost perfeito para links de detalhamento.
              </p>
              <Button variant="ghost" size="sm">
                Saiba Mais
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Divisor Onda Branca para Gelo */}
      <SectionDivider variant="wave" to="gelo" />

      {/* Seção Gelo */}
      <Section background="gelo">
        <Container>
          <SectionTitle
            highlight="família"
            subtitle="Aqui ninguém caminha só. Nossos Pequenos Grupos Multiplicadores cuidam de você em cada fase da vida."
          >
            Um lugar para sua família
          </SectionTitle>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="primary" size="lg">
              Planeje sua Visita
            </Button>
            <Button variant="secondary" size="lg">
              Ver Horários dos Cultos
            </Button>
          </div>
        </Container>
      </Section>

      {/* Divisor Diagonal Gelo para Marinho */}
      <SectionDivider variant="diagonal" to="marinho" />

      {/* Seção Marinho */}
      <Section background="marinho">
        <Container>
          <SectionTitle
            light
            highlight="esperança"
            subtitle="Nossa missão é compartilhar o evangelho transformador de Jesus com toda a nossa cidade."
          >
            Mensagem de esperança
          </SectionTitle>
        </Container>
      </Section>
    </div>
  );
}
