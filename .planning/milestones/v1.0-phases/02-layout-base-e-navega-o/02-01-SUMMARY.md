---
phase: 02-layout-base-e-navega-o
plan: 01
status: completed
executed_at: 2026-09-29T22:22:00Z
requirements:
  - NAV-01
  - NAV-02
  - NAV-03
---

# Plan 02-01 Summary: Navegação Base, Header Fixo com Scrollspy, Menu Mobile Drawer e Botão Flutuante de WhatsApp

## Implementação Realizada

1. **Hook `useScrollspy` e Estilos de Scroll:**
   - Criado `hooks/useScrollspy.ts` client-side utilizando `IntersectionObserver` com `rootMargin: "-20% 0px -70% 0px"`.
   - Incluída função de limpeza obrigatória no unmount para evitar vazamentos de memória.
   - Adicionada regra `section[id] { scroll-margin-top: 5rem; }` em `app/globals.css` para compensar a barra superior fixa de 80px durante a navegação por âncoras.

2. **Menu Mobile Drawer Acessível:**
   - Criado `components/layout/MobileDrawer.tsx` com fundo marinho escuro `#122035` e transição lateral animada.
   - Implementada trava de rolagem (`document.body.style.overflow = "hidden"`) e escuta da tecla `Escape` com descarte e restauração correta.
   - Adicionados atributos de acessibilidade (`aria-expanded`, `aria-controls`, `aria-label`) e touch targets mínimos de 48px nos botões de controle.
   - Lista completa com os 11 links de âncora, fechamento automático ao selecionar qualquer item, e cartão de rodapé com endereço de Vila Isabel e CTA.

3. **Header Fixo Responsivo com Scrollspy:**
   - Atualizado `components/layout/Header.tsx` integrando os 11 links canônicos do protótipo Stitch (`#inicio`, `#historia`, `#cultos`, `#eventos`, `#lives`, `#grupos`, `#ministerios`, `#acao-social`, `#oracao`, `#visita`, `#contato`).
   - Destaque visual em cobalto (`border-b-2 border-cobalto text-cobalto font-bold`) para a seção ativa.
   - Breakpoint configurado em `xl` (1280px) para alternar entre navegação expandida e botão hambúrguer.

4. **Botão Flutuante de WhatsApp:**
   - Criado `components/layout/FloatingWhatsApp.tsx` no canto inferior direito (`fixed bottom-6 right-6 z-40`).
   - Cor oficial `#25D366`, ícone preenchido de WhatsApp, link dinâmico via `wa.me` com número e mensagem pré-configurada sanitizada.
   - Integrado globalmente em `app/layout.tsx`.

5. **Correção de Build e Robustez:**
   - Adicionado `app/not-found.tsx` personalizado para atender à exigência de geração de páginas de erro estáticas do Next.js 15.
   - Adicionado `.gitignore` padrão do ecossistema Next.js.
   - Compilação do TypeScript e `npm run build` validados com sucesso (exit code 0).
