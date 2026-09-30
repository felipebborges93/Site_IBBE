# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Público Primário:** Moradores e famílias trabalhadoras de Vila Isabel e bairros vizinhos em Resende/RJ, que acessam primariamente pelo celular com conexões móveis 3G/4G modestas ou instáveis. Buscam acolhimento, saber horários de cultos, localização exata e planejar a primeira visita sem constrangimento ou dúvidas.
- **Público Secundário:** Membros da congregação e pessoas que necessitam de apoio espiritual (pedir oração, acompanhar lives de culto no YouTube, consultar escalas, eventos e pequenos grupos).
- **Mantenedor do Site:** Voluntário ou líder da igreja leigo em desenvolvimento, apoiado por ferramentas de IA; necessita atualizar horários, avisos e eventos em arquivos simples de conteúdo (`content/*.ts`) sem manipular código de componentes.

## Product Purpose

Servir como presença digital oficial e porta de entrada acolhedora da Igreja Batista Bethel em Resende. O produto existe para conectar pessoas à comunidade de fé através de um acolhimento acessível: permitir que qualquer pessoa descubra rapidamente quando é o próximo culto, como chegar, assista a transmissões ao vivo e envie pedidos de oração (inclusive anônimos). O sucesso significa o visitante sentir segurança e acolhimento para sua primeira visita presencial e a intercessão da igreja alcançar as pessoas no momento de necessidade.

## Positioning

"Uma igreja feita de pessoas." / "Aqui ninguém caminha só."
Conhecida afetivamente como a "Igrejinha do cantão" em Vila Isabel: uma comunidade cristã autêntica, próxima, acolhedora e sem burocracias ou jargões herméticos, onde cada indivíduo é recebido com amor e dignidade.

## Operating Context

- Acesso preponderante via smartphones em momentos de necessidade emocional ou planejamento de rotina semanal.
- Rituais da igreja: Culto de Celebração (domingo à noite), Escola Bíblica Dominical (domingo pela manhã), Culto de Oração (quarta-feira à noite), e Pequenos Grupos Multiplicadores (PGMs) nos lares durante a semana.
- Moderação pastoral contínua de pedidos de oração para acolhimento espiritual e futura integração com exibição em telão durante cultos.

## Capabilities and Constraints

- **Tecnologias:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Phosphor Icons.
- **Backend / Dados:** Supabase (Postgres) com Row Level Security (RLS) para pedidos de oração e autenticação administrativa para moderação (`/admin/oracao`).
- **Comunicação e Mídia:** YouTube Data API v3 com cache e fallback para últimas transmissões ao vivo; links diretos para WhatsApp institucional.
- **Privacidade & Segurança:** Formulário de oração com opção anônima, honeypot anti-spam, rate limit por hash de IP e estrita conformidade com a LGPD (sem cookies invasivos de rastreamento).
- **Conteúdo desacoplado:** Configurações e textos mantidos na pasta `content/*.ts`.
- **Limites de Escopo:** Sem aplicativo nativo (o site mobile atende plenamente), sem e-commerce ou sistema complexo de membresia com login de fiéis, sem multi-idioma.

## Brand Commitments

- **Nome Oficial:** Igreja Batista Bethel em Resende (IBBE)
- **Tom de Voz:** Acolhedor, próximo, esperançoso, claro e direto em Português do Brasil. Sem terminologia religiosa inacessível para quem não frequenta igreja.
- **Identidade Visual Existente:** Baseada no protótipo Stitch ("Igreja Batista Bethel Landing Page", projeto `projects/1914640869962780045`).
- **Paleta de Cores:** Azul Marinho (`#122035`), Cobalto (`#1D75DD`), Azul Céu (`#48A4FF`), Gelo (`#D7E9F4`), Branco (`#FFFFFF`) e Verde acento (`#00A818`).
- **Tipografia:** Bricolage Grotesque (títulos e corpo) com acento manuscrito pontual via Caveat / Dongra Script para destacar uma única palavra de impacto nos cabeçalhos.

## Evidence on Hand

- Documentação histórica: `historia ibbe.pdf` (registro de fundação em 28/10/2000 por 28 irmãos e trajetória).
- Apresentação institucional: `Apresentação - IBBE - COMPLETA_compressed.pdf`.
- Referências visuais e protótipos: `stitch-desktop.html` e `stitch-mobile.html`.
- Conteúdo já estruturado no projeto: `content/site.ts`, `content/history.ts`, `content/services.ts`, `content/events.ts`, `content/groups.ts`, `content/ministries.ts`, `content/faq.ts`.
- Planejamento de engenharia: `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`.

## Product Principles

1. **Acolhimento Acessível em Primeiro Lugar:** Toda interação e mensagem devem desarmar apreensões de visitantes de primeira viagem, informando com clareza o que esperar, como se vestir e como chegar.
2. **Leveza Extrema e Mobile-First:** O site deve carregar em frações de segundo em celulares de entrada sob conexões móveis instáveis.
3. **Privacidade e Confiança:** Pedidos de oração e intercessão recebem tratamento confidencial e respeitam opções de anonimato sem qualquer rastreamento comercial de dados.
4. **Facilidade de Manutenção Comunitária:** O conteúdo deve ser editável por qualquer membro responsável sem exigir conhecimento de arquitetura de código.

## Accessibility & Inclusion

- Conformidade com padrões WCAG AA (contraste rigoroso para facilitar a leitura sob luz solar ou telas de baixo brilho, tipografia confortável).
- Navegação fluida por teclado e marcação semântica para leitores de tela.
- Respeito à preferência de redução de movimentos (`prefers-reduced-motion`).
- Linguagem simples e acolhedora, acessível a todas as faixas etárias.
