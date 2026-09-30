# Summary: 06-02 Acessibilidade (WCAG AA), Design Tokens e Otimização de Performance

**Phase:** 06  
**Plan:** 02  
**Status:** Complete  
**Date:** 2026-09-29  

## O que foi construído

1. **Acessibilidade e Contraste WCAG AA (A11Y-01, D-02):**
   - Calibrado token de cor `cobalto` de `#1D75DD` para `#1765C2` em `tailwind.config.ts`, garantindo contraste ≥ 4.5:1 (WCAG AA) para textos e botões sobre branco sem necessidade de um botão redundante de alto contraste.
   - Implementado Skip Link acessível no topo do DOM em `app/layout.tsx` (`Saltar para o conteúdo principal`) visível apenas via foco de teclado (`sr-only focus:not-sr-only`).
   - Adicionado `id="main-content"` e `tabIndex={-1}` no elemento `<main>` de `app/layout.tsx`.

2. **Navegação por Teclado, Foco Visível e Motion (A11Y-02, A11Y-03):**
   - Configurados anéis de foco consistentes e de alto contraste via `*:focus-visible` em `app/globals.css`.
   - Adicionada regra global de media query `@media (prefers-reduced-motion: reduce)` em `app/globals.css`, neutralizando animações e transições para usuários sensíveis.
   - Adicionado `role="status"` e `aria-live="polite"` no feedback de status do formulário de pedidos de oração em `app/(public)/oracao/PrayerForm.tsx`.

3. **Otimização de Imagens e Performance (PERF-01, PERF-02):**
   - Configurados formatos modernos `image/avif` e `image/webp` com deviceSizes otimizados em `next.config.ts`.
   - Substituídas todas as tags legadas `<img>` por componentes `<Image>` otimizados do `next/image` em `components/home/HistorySection.tsx`, `components/home/SocialActionSection.tsx` e `app/nossa-historia/page.tsx`, com atributos `alt` descritivos, layouts responsivos `sizes` e lazy loading automático.
   - Garantido que fontes mantêm `display: "swap"` em `app/layout.tsx` prevenindo bloqueio de renderização do texto inicial.

## Verificação

- `npm run build`: Build de produção executado com sucesso e todas as páginas geradas estaticamente com bundle otimizado.
- `npx tsc --noEmit`: Checagem estrita de tipos sem erros.
