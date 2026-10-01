# Phase 13: Exibição no Telão - Context

**Gathered:** 2026-10-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Esta fase entrega a interface front-end em tela cheia otimizada para projetar pedidos de oração na igreja, acessível exclusivamente através da rota dinâmica `/telao/[token]`. O escopo inclui a validação de segurança no servidor do parâmetro `[token]` contra `TELAO_API_TOKEN`, layout fullscreen (1080p/4K) com tema escuro de alto contraste, tipografia legível a grandes distâncias, paginação manual em lotes fixos (4 a 6 pedidos por tela) e botão de controle para o operador marcar o lote visível como exibido via API sem saltos ou rolagem inesperada.

</domain>

<decisions>
## Implementation Decisions

### Layout e Tema Visual da Projeção
- **D-01:** Fundo preto/muito escuro (`bg-black` ou `bg-slate-950`) com cards em alto contraste e tipografia branca/âmbar dourado (`text-amber-400` nos destaques/nomes e `text-white` para o texto dos pedidos), eliminando completamente barras de rolagem (`overflow-hidden`), garantindo máxima legibilidade em projetores de igreja. — **Reversibility:** reversible
- **D-02:** Quantidade fixa de 4 pedidos por tela dispostos em grid de 2x2 (ou 6 em 3x2 em telas 4K), com tamanhos de fonte generosos (`text-2xl` a `text-3xl`) para garantir leitura clara a até 20–30 metros de distância. — **Reversibility:** reversible

### Segurança e Acesso à Rota
- **D-03:** A rota `/telao/[token]` valida o parâmetro diretamente no Server Component contra a variável de ambiente `TELAO_API_TOKEN`. Se o token for inválido, renderiza tela de acesso negado (HTTP 401/403) ou redireciona sem expor a interface de projeção. O token de sessão é propagado para as chamadas internas aos endpoints `/api/prayer-requests/*`. — **Reversibility:** reversible

### Fluxo Operacional e Marcação de Exibidos
- **D-04:** O operador avança os lotes manualmente via botão discreto na tela (ou tecla de atalho como Barra de Espaço / Seta Direita). Ao clicar em "Avançar Lote" ou "Marcar como Exibidos e Próximo", o sistema dispara chamadas POST em lote para `/api/prayer-requests/[id]/displayed` para cada um dos pedidos do lote atual e carrega o próximo grupo de pedidos aprovados. — **Reversibility:** reversible
- **D-05:** Ausência de rotação ou transição automática: pedidos permanecem 100% estáticos na tela durante o momento de oração congregacional até que o operador da mídia decida avançar, atendendo ao requisito explícito de evitar distrações e garantir tempo suficiente para leitura. — **Reversibility:** reversible

### Estados Vazios e Sem Pedidos Pendentes
- **D-06:** Quando não houver pedidos aprovados aguardando projeção, exibir uma mensagem acolhedora com tema congregacional (ex: "Momento de Oração Congregacional — Igreja Batista Bethel em Resende" com versículo bíblico ou instrução pastoral), mantendo o padrão visual sem telas pretas vazias ou mensagens técnicas de erro. — **Reversibility:** reversible

### the agent's Discretion
- Organização dos cards e animação sutil (fade in suave) na transição manual de lote para evitar cortes bruscos no projetor.
- Opção de tecla de atalho (Barra de Espaço / Setas) adicional ao botão de tela para facilitar a operação na mesa de som/mídia.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planejamento e Requisitos
- `.planning/REQUIREMENTS.md` — Requisitos TELA-01, TELA-02, TELA-03.
- `.planning/ROADMAP.md` — Especificações e critérios de sucesso da Fase 13.

### Endpoints da API do Telão (Fase 12)
- `app/api/prayer-requests/display/route.ts` — Endpoint GET autenticado via Bearer token que retorna pedidos aprovados e não exibidos (`status = 'approved'`, `displayed = false`).
- `app/api/prayer-requests/[id]/displayed/route.ts` — Endpoint POST autenticado via Bearer token que marca um pedido como exibido (`displayed = true`).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `lib/env.ts`: Função `validateServerSecrets()` para verificação segura das variáveis de ambiente (`TELAO_API_TOKEN`).
- `utils/supabase/server.ts`: Cliente de servidor admin (`createAdminClient`) caso necessário no Server Component da página.

### Established Patterns
- Rota no App Router do Next.js 15: Página dinâmica em `app/telao/[token]/page.tsx`.
- Comunicação segura com endpoints protegidos por Bearer Token.

### Integration Points
- `app/telao/[token]/page.tsx`: Interface principal de projeção no telão.
- `app/telao/[token]/TelaoDisplay.tsx`: Componente cliente interativo para manipulação de lotes, atalhos de teclado e acionamento dos endpoints `/api/prayer-requests/*`.

</code_context>

<specifics>
## Specific Ideas

- Projeção em tela cheia (F11 ou botão Fullscreen nativo no navegador do operador).
- Tipografia em alto contraste com tamanho grande para leitura de longe no santuário.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 13-Exibição no Telão*
*Context gathered: 2026-10-01*
