import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content";

export const metadata: Metadata = {
  title: "Política de Privacidade e Proteção de Dados",
  description:
    "Transparência, respeito e acolhimento. Saiba como a Igreja Batista Bethel em Resende cuida da sua privacidade e de seus pedidos de oração em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="py-12 md:py-20 bg-branco min-h-[70vh]">
      <Container size="md">
        <header className="mb-12 text-center md:text-left border-b border-gelo pb-8">
          <p className="text-cobalto font-bold text-sm tracking-wider uppercase mb-2">
            Transparência e Respeito
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-marinho mb-4">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-marinho/80 text-base md:text-lg leading-relaxed max-w-2xl">
            Na {siteConfig.name}, valorizamos profundamente cada pessoa que se conecta conosco. Aqui explicamos com clareza e acolhimento como cuidamos de suas informações.
          </p>
        </header>

        <div className="prose prose-slate max-w-none space-y-10 text-marinho/85 leading-relaxed text-base">
          {/* Seção 1 */}
          <section className="bg-gelo/40 p-6 md:p-8 rounded-2xl border border-gelo">
            <h2 className="text-xl md:text-2xl font-bold text-marinho mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalto inline-block" />
              1. Nosso Princípio: Sem Cadastro Obrigatório
            </h2>
            <p>
              Não realizamos cadastro de visitantes pelo site. Acreditamos que a fé e o acolhimento devem ser livres de barreiras burocráticas ou captura invasiva de dados. Você pode navegar por toda a nossa programação, horários de cultos, história e mensagens sem fornecer nenhum dado pessoal.
            </p>
          </section>

          {/* Seção 2 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gelo shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-marinho mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-verde inline-block" />
              2. Pedidos de Oração, Anonimato e Exibição no Telão
            </h2>
            <p>
              Nosso canal de oração existe exclusivamente para abençoar e interceder por você e sua família, com total respeito à sua privacidade e às diretrizes da LGPD (Lei nº 13.709/2018):
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3 text-marinho/80">
              <li>
                <strong>Anonimato Completo:</strong> Você tem a total liberdade de marcar a opção de envio anônimo. Nesse caso, nenhum nome é solicitado ou armazenado junto ao seu pedido, garantindo sigilo absoluto.
              </li>
              <li>
                <strong>Intercessão Pastoral:</strong> Quando você fornece seu primeiro nome sem autorizar exibição pública, os dados são utilizados estritamente pelo ministério pastoral e equipe de intercessão da igreja durante os momentos reservados de oração.
              </li>
              <li>
                <strong>Exibição Pública no Telão da Igreja:</strong> Em nossos cultos, projetamos motivos de oração da comunidade para que toda a igreja ore em conjunto. A exibição do seu nome e motivo no telão é <strong>estritamente voluntária e condicionada à sua autorização explícita</strong> no formulário. Pedidos não autorizados ou anônimos jamais são exibidos com identificação nominal.
              </li>
              <li>
                <strong>Moderação Humana Prévia:</strong> Todos os pedidos passam por moderação pastoral antes de qualquer leitura ou projeção, visando proteger a intimidade das pessoas e evitar exposição indevida de dados pessoais ou sensíveis de terceiros.
              </li>
              <li>
                <strong>Sem Repasse Comercial:</strong> Em hipótese alguma compartilhamos, vendemos ou cedemos pedidos de oração ou nomes a empresas ou terceiros.
              </li>
            </ul>
          </section>

          {/* Seção 3 */}
          <section className="bg-gelo/40 p-6 md:p-8 rounded-2xl border border-gelo">
            <h2 className="text-xl md:text-2xl font-bold text-marinho mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ceu inline-block" />
              3. Ausência de Cookies de Rastreamento
            </h2>
            <p>
              Nosso site não utiliza cookies invasivos de publicidade, redes sociais de monitoramento ou scripts que rastreiam seu comportamento pela web. Por esse motivo, você não encontrará banners incômodos solicitando permissões de cookies: respeitamos a sua privacidade por padrão de projeto.
            </p>
          </section>

          {/* Seção 4 */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-gelo shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-marinho mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-marinho inline-block" />
              4. Segurança Técnica e Proteção Anti-Spam
            </h2>
            <p>
              Para proteger nosso formulário de oração contra ataques automatizados e abusos de robôs (spam), verificamos de maneira temporária a frequência de envios por endereço IP. Esses dados não são utilizados para identificar indivíduos nem cruzados com nenhum outro sistema.
            </p>
            <p className="mt-3">
              Todas as transmissões de dados são criptografadas via protocolo HTTPS com padrões modernos de segurança na web.
            </p>
          </section>

          {/* Seção 5 */}
          <section className="bg-gelo/30 p-6 md:p-8 rounded-2xl border border-gelo">
            <h2 className="text-xl md:text-2xl font-bold text-marinho mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalto inline-block" />
              5. Seus Direitos (LGPD) e Contato
            </h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode a qualquer momento solicitar a confirmação, atualização ou exclusão de qualquer dado ou pedido que tenha submetido com identificação.
            </p>
            <div className="mt-4 p-4 bg-white rounded-xl border border-gelo text-sm">
              <p className="font-semibold text-marinho mb-1">
                Fale com a nossa administração:
              </p>
              <p>
                <strong>E-mail:</strong> {siteConfig.contact.email}
              </p>
              <p>
                <strong>Telefone/WhatsApp:</strong> {siteConfig.contact.phone}
              </p>
              <p>
                <strong>Endereço:</strong> {siteConfig.location.address}, {siteConfig.location.neighborhood} — {siteConfig.location.city}/{siteConfig.location.state}
              </p>
            </div>
          </section>

          <div className="pt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-cobalto hover:underline gap-1"
            >
              &larr; Voltar para a página inicial
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
