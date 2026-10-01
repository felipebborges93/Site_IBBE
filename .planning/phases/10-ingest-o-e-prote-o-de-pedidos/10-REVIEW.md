---
phase: 10-ingest-o-e-prote-o-de-pedidos
reviewed: 2026-10-01T13:57:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - lib/rate-limit.ts
  - lib/sanitize.ts
  - lib/validations/prayer.ts
  - app/actions/prayer.ts
  - app/(public)/oracao/PrayerForm.tsx
  - tests/e2e/prayer-security.spec.ts
  - tests/e2e/prayer-ingestion.spec.ts
findings:
  critical: 1
  warning: 5
  info: 2
  total: 8
status: issues_found
---

# Phase 10: Code Review Report

**Reviewed:** 2026-10-01T13:57:00Z  
**Depth:** standard  
**Files Reviewed:** 7  
**Status:** issues_found  

## Summary

A revisão de código da Fase 10 analisou todos os 7 arquivos criados e modificados para ingestão e proteção dos pedidos de oração (rate limiting com hash LGPD, sanitização de HTML/XSS, validação Zod, Server Action com honeypot, formulário interativo acessível em React 19 e testes automatizados Playwright).

A arquitetura geral e as decisões de segurança (como o honeypot transparente para usuários legítimos e o hash com salt para IPs) foram estruturadas conforme as diretrizes do projeto. No entanto, foram identificados problemas que necessitam de correção:
1. **Perda de dados por regex ingênua e poluição de entidades HTML** em `lib/sanitize.ts` (CR-01).
2. **Dependência obsoleta no `useEffect` de reset do formulário** em `PrayerForm.tsx` (WR-01).
3. **Vulnerabilidade de bypass por spoofing de cabeçalho `x-forwarded-for`** em `app/actions/prayer.ts` (WR-02).
4. **Consumo prematuro da cota de rate limit em erros de validação** em `app/actions/prayer.ts` (WR-03).
5. **Memory leak potencial no armazenamento in-memory de rate limiting** em `lib/rate-limit.ts` (WR-04).
6. **Falha de execução nos testes E2E do Playwright por violação de modo estrito** em `tests/e2e/prayer-ingestion.spec.ts` (WR-05).

---

## Critical Issues

### CR-01: Perda silenciosa de dados e poluição por entidades HTML em `sanitizeHtml`

**File:** [lib/sanitize.ts:10-27](file:///home/felipe/Projetos%20IA/Site_IBBE/lib/sanitize.ts#L10-L27)  
**Issue:**  
A sanitização implementada utiliza a expressão regular ingênua `/<[^>]*>/g` para remoção de tags. Quando o usuário escreve comparações matemáticas ou caracteres menores/maiores legítimos (por exemplo: `"salário < 1000 e despesa > 900"`), a regex consome todo o trecho intermediário (` 1000 e despesa `), causando perda permanente e silenciosa do conteúdo digitado.

Adicionalmente, a substituição de caracteres especiais por entidades HTML (`&amp;`, `&#39;`, `&quot;`, `&lt;`, `&gt;`) persiste essas strings codificadas no Supabase. Como o React já realiza escape automático de strings em JSX (`{req.request}`), componentes de exibição (como a tela de moderação administrativa em `app/admin/oracao/page.tsx`) exibem textualmente as entidades (`&amp;`, `&#39;`), degradando a leitura humana. Essa codificação também infla artificialmente a contagem de caracteres, podendo causar rejeição indevida na validação de 1000 caracteres do Zod.

**Fix:**  
Remover apenas tags HTML reais mantendo operadores legítimos, ou utilizar uma biblioteca padrão de neutralização/extração de texto puro sem transformar caracteres normais em entidades HTML quando o destino de renderização for React JSX:

```typescript
export function sanitizeHtml(input: string): string {
  if (!input) return "";

  // Remove apenas tags HTML reconhecíveis (ex: <script...>, <div>, etc.)
  // sem apagar comparações legítimas como '< 1000'
  return input
    .replace(/<\/?[a-zA-Z][^>]*>/g, "")
    .trim();
}
```

---

## Warnings

### WR-01: Stale Dependency no `useEffect` de reset do formulário

**File:** [app/(public)/oracao/PrayerForm.tsx:27-33](file:///home/felipe/Projetos%20IA/Site_IBBE/app/(public)/oracao/PrayerForm.tsx#L27-L33)  
**Issue:**  
O hook `useEffect` responsável por resetar o formulário possui `[state?.success]` em seu array de dependências. Caso o usuário envie um primeiro pedido com sucesso (`state.success === true`), o formulário é limpo. Se em seguida enviar um segundo pedido com sucesso, o valor primitivo booleano da dependência permanece `true` (`true === true`), impedindo que o `useEffect` dispare novamente. Com isso, os campos não são resetados em submissões bem-sucedidas consecutivas.

**Fix:**  
Vincular a dependência ao próprio objeto de estado `state`:

```tsx
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setRequestText("");
      setIsAnonymous(false);
    }
  }, [state]);
```

---

### WR-02: Possibilidade de bypass de rate limiting por spoofing de cabeçalho `x-forwarded-for`

**File:** [app/actions/prayer.ts:31-34](file:///home/felipe/Projetos%20IA/Site_IBBE/app/actions/prayer.ts#L31-L34)  
**Issue:**  
A leitura do IP do cliente através de `headerList.get("x-forwarded-for")?.split(",")[0]` obtém o primeiro elemento da cadeia. Qualquer cliente HTTP pode enviar cabeçalhos arbitrários `X-Forwarded-For: 1.2.3.4`, falsificando o IP extraído pelo primeiro elemento da lista e contornando o limite de 3 requisições por hora.

**Fix:**  
Priorizar cabeçalhos de proxies confiáveis da infraestrutura (como `x-real-ip` ou `cf-connecting-ip`) antes do cabeçalho geral `x-forwarded-for`:

```typescript
    const headerList = await headers();
    const realIp = headerList.get("x-real-ip");
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = realIp || (forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1");
    const ipHashed = hashIp(ip);
```

---

### WR-03: Consumo da cota de rate limit em falhas de validação de formulário

**File:** [app/actions/prayer.ts:36-63](file:///home/felipe/Projetos%20IA/Site_IBBE/app/actions/prayer.ts#L36-L63)  
**Issue:**  
A função `checkRateLimit(ipHashed)` é chamada na linha 36, antes de `prayerFormSchema.safeParse` na linha 56. Caso um usuário legítimo cometa 3 erros de preenchimento (por exemplo, texto com 4 caracteres ou nome em branco no modo identificado), sua cota de 3 pedidos por hora é totalmente esgotada antes mesmo de conseguir registrar qualquer pedido no banco de dados.

**Fix:**  
Verificar e incrementar o rate limit somente após a validação do schema ou reservar a cota apenas quando a requisição for estruturalmente válida:

```typescript
    // 3. Sanitização e Validação Zod primeiro
    const sanitizedName = typeof rawData.name === "string" ? sanitizeHtml(rawData.name) : "";
    const sanitizedRequest = typeof rawData.request === "string" ? sanitizeHtml(rawData.request) : "";

    const payloadToValidate = {
      name: sanitizedName,
      request: sanitizedRequest,
      is_anonymous: isAnonymous,
      honeypot,
    };

    const validated = prayerFormSchema.safeParse(payloadToValidate);
    if (!validated.success) {
      return {
        success: false,
        message: "Verifique os campos do formulário.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    // 4. Rate Limiting consumido apenas para requisições válidas
    const { allowed } = checkRateLimit(ipHashed);
    if (!allowed) {
      return {
        success: false,
        message: "Limite de pedidos atingido (máximo de 3 pedidos por hora). Por favor, tente novamente mais tarde.",
      };
    }
```

---

### WR-04: Acúmulo ilimitado de registros em memória (`rateLimitStore`)

**File:** [lib/rate-limit.ts:8, 27-42](file:///home/felipe/Projetos%20IA/Site_IBBE/lib/rate-limit.ts#L8-L42)  
**Issue:**  
O mapa `rateLimitStore` armazena registros por hash de IP indefinidamente. Registros antigos nunca são deletados a menos que o mesmo IP requisite o serviço novamente após a janela. Em um ambiente Node.js de longa duração ou sob varreduras automatizadas, o `Map` acumulará chaves sem expiração de memória (unbounded map growth).

**Fix:**  
Implementar uma limpeza periódica de entradas expiradas ou expirar registros caso o tamanho do `Map` ultrapasse um limite operacional (ex: 5.000 entradas):

```typescript
function cleanupExpiredRecords(now: number): void {
  if (rateLimitStore.size > 1000) {
    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }
}
```

---

### WR-05: Falha nos testes Playwright por colisão de seletor estrito com `#__next-route-announcer__`

**File:** [tests/e2e/prayer-ingestion.spec.ts:55-57, 72-74](file:///home/felipe/Projetos%20IA/Site_IBBE/tests/e2e/prayer-ingestion.spec.ts#L55-L74)  
**Issue:**  
A execução de `npx playwright test tests/e2e/prayer-ingestion.spec.ts` falha em 2 dos 4 testes com erro de strict mode violation:  
`locator('[role=\'alert\']') resolved to 2 elements: (1) <div role="alert">...</div>, (2) <div role="alert" id="__next-route-announcer__"></div>`.  
O Next.js injeta automaticamente o elemento de navegação com `role="alert"`, impedindo asserções genéricas por seletor global.

**Fix:**  
Restringir o locator para o escopo do formulário:

```typescript
const alertBox = page.locator("form [role='alert']");
await expect(alertBox).toBeVisible();
```

---

## Info

### IN-01: Atualização aria-live de alta frequência no contador de caracteres

**File:** [app/(public)/oracao/PrayerForm.tsx:115-125](file:///home/felipe/Projetos%20IA/Site_IBBE/app/(public)/oracao/PrayerForm.tsx#L115-L125)  
**Issue:**  
O elemento `<span aria-live="polite">` é atualizado a cada tecla digitada no textarea via `onChange`. Isso pode sobrecarregar leitores de tela com anúncios constantes durante a digitação de textos longos.  
**Fix:**  
Remover `aria-live="polite"` da visualização regular do contador ou anunciar apenas quando o usuário se aproximar do limite (ex: > 950 caracteres).

---

### IN-02: Ausência de sanitização/trimming em `prayerFormSchema` standalone

**File:** [lib/validations/prayer.ts:10-13](file:///home/felipe/Projetos%20IA/Site_IBBE/lib/validations/prayer.ts#L10-L13)  
**Issue:**  
O campo `request` no schema Zod não inclui `.trim()`. Caso o schema seja utilizado diretamente fora da Server Action, strings compostas exclusivamente por 5 espaços em branco (`"     "`) seriam aceitas como válidas.  
**Fix:**  
Adicionar `.trim()` ou refinamento de não-espaço no campo `request` do schema Zod.

---

_Reviewed: 2026-10-01T13:57:00Z_  
_Reviewer: Claude (gsd-code-reviewer)_  
_Depth: standard_
