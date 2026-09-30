# Phase 02: Layout Base e Navegação - Pattern Map

**Mapped:** 2026-09-29
**Files analyzed:** 10
**Analogs found:** 10 / 10

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `hooks/useScrollspy.ts` | hook | event-driven | `components/layout/HeaderScrollWatcher.tsx` | role-match |
| `lib/utils/services.ts` | utility | transform | `content/services.ts` | role-match |
| `components/layout/Header.tsx` | component | request-response / event-driven | `components/layout/Header.tsx` | exact |
| `components/layout/MobileDrawer.tsx` | component | event-driven | `components/layout/HeaderScrollWatcher.tsx` | role-match |
| `components/layout/FloatingWhatsApp.tsx` | component | request-response | `components/ui/Button.tsx` | role-match |
| `components/home/Hero.tsx` | component | request-response | `app/page.tsx` | exact |
| `components/home/NextServiceBar.tsx` | component | request-response / transform | `components/ui/Card.tsx` | role-match |
| `app/layout.tsx` | component / layout | request-response | `app/layout.tsx` | exact |
| `app/page.tsx` | component / route | request-response | `app/page.tsx` | exact |
| `app/globals.css` | config / style | static | `app/globals.css` | exact |

---

## Pattern Assignments

### `hooks/useScrollspy.ts` (hook, event-driven)

**Analog:** `components/layout/HeaderScrollWatcher.tsx`

**Imports & Directive pattern:**
```typescript
"use client";

import { useEffect, useState } from "react";
```

**Core Observer Pattern (adapted from client lifecycle in `components/layout/HeaderScrollWatcher.tsx` lines 12-26):**
```typescript
// Pattern: useEffect with DOM observer/listener setup and mandatory cleanup
export function useScrollspy(sectionIds: string[], offsetRootMargin = "-20% 0px -70% 0px") {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: offsetRootMargin,
      threshold: [0, 0.2, 0.5],
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offsetRootMargin]);

  return activeId;
}
```

---

### `lib/utils/services.ts` (utility, transform)

**Analog:** `content/services.ts` & `components/ui/SectionTitle.tsx` (pure string/data transformation)

**Imports & Types pattern (from `content/services.ts` lines 1-8):**
```typescript
import { Service } from "@/content/services";

export interface NextServiceResult {
  service: Service;
  formattedDate: string; // e.g., "Domingo às 19:00"
  timeUntil?: string;
  isToday: boolean;
}
```

**Core Calculation Pattern:**
```typescript
/**
 * Calculates the next chronological service based on current day and time.
 * Falls back resiliently to the main Sunday 19:00 service if calculation encounters an edge case.
 */
export function calculateNextService(
  serviceList: Service[],
  now: Date = new Date()
): NextServiceResult {
  if (!serviceList || serviceList.length === 0) {
    // Fallback resilient object
    return {
      service: {
        id: "fallback",
        title: "Culto de Celebração",
        day: "Domingo",
        time: "19:00",
        description: "Nosso encontro congregacional com louvor e palavra.",
      },
      formattedDate: "Domingo às 19:00",
      isToday: false,
    };
  }

  // Parse days of week mapping: Domingo = 0, Segunda = 1, ..., Quinta = 4, etc.
  const dayMap: Record<string, number> = {
    domingo: 0,
    "segunda-feira": 1,
    "terça-feira": 2,
    "quarta-feira": 3,
    "quinta-feira": 4,
    "sexta-feira": 5,
    sábado: 6,
  };

  // Chronological candidate calculation logic ...
}
```

---

### `components/layout/Header.tsx` (component, request-response / event-driven)

**Analog:** `components/layout/Header.tsx` (lines 1-54) & `stitch-desktop.html` (lines 45-98)

**Imports pattern (lines 1-7):**
```typescript
import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { HeaderScrollWatcher } from "./HeaderScrollWatcher";
```

**Core Navigation & Active Indicator Pattern (lines 8-49):**
```typescript
// Navigation links mapping aligned with Stitch design:
const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Nossa história", href: "#historia" },
  { label: "Cultos", href: "#cultos" },
  { label: "Eventos", href: "#eventos" },
  { label: "Lives", href: "#lives" },
  { label: "PGMs", href: "#grupos" },
  { label: "Ministérios", href: "#ministerios" },
  { label: "Ação Social", href: "#acao-social" },
  { label: "Oração", href: "#oracao" },
  { label: "Sou Novo", href: "#visita" },
  { label: "Contato", href: "#contato" },
];

// Desktop navigation link item with Scrollspy active state:
<Link
  key={link.href}
  href={link.href}
  className={clsx(
    "text-[14px] font-medium tracking-tight transition-colors duration-150 py-1",
    activeId === link.href.replace("#", "")
      ? "text-cobalto font-bold border-b-2 border-cobalto"
      : "text-marinho/80 hover:text-cobalto"
  )}
>
  {link.label}
</Link>
```

---

### `components/layout/MobileDrawer.tsx` (component, event-driven)

**Analog:** `components/layout/HeaderScrollWatcher.tsx` (state & DOM effects) & `stitch-mobile.html` (lines 86-116)

**Imports & Directive pattern:**
```typescript
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import { siteConfig } from "@/content";
```

**Scroll Lock & Escape Key Listener Pattern:**
```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeId?: string;
}

export function MobileDrawer({ isOpen, onClose, activeId }: MobileDrawerProps) {
  // Lock body scroll when drawer is open and support Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  return (
    <nav
      id="mobile-nav-drawer"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 bg-marinho text-white transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
      }`}
    >
      {/* Drawer content: close button, links, location footer */}
    </nav>
  );
}
```

---

### `components/layout/FloatingWhatsApp.tsx` (component, request-response)

**Analog:** `components/ui/Button.tsx` (lines 22-40) & `stitch-desktop.html` (lines 896-900)

**Imports & Config pattern:**
```typescript
import React from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content";
```

**Core Component Structure:**
```typescript
export function FloatingWhatsApp() {
  const phone = siteConfig.contact.whatsapp.replace(/\D/g, "") || "5524999999999";
  const defaultMessage = encodeURIComponent(
    "Olá! Visitei o site da Igreja Batista Bethel em Resende e gostaria de mais informações."
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center text-3xl shadow-lg hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <WhatsappLogo size={32} weight="fill" />
    </a>
  );
}
```

---

### `components/home/Hero.tsx` (component, request-response)

**Analog:** `app/page.tsx` (lines 13-39) & `stitch-desktop.html` (lines 99-151)

**Imports & Content integration pattern:**
```typescript
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig, services } from "@/content";
import { NextServiceBar } from "./NextServiceBar";
```

**Core Editorial Typography & Asymmetric Mosaic Pattern:**
```typescript
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] pt-28 pb-12 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white/70 via-gelo-light/85 to-gelo/95"
    >
      <Container size="xl" className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Coluna Esquerda: Tipografia Editorial */}
        <div className="lg:col-span-6 z-10 pt-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-verde animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold text-marinho/70">
              Vila Isabel, Resende &bull; Venha como você está
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-extrabold text-marinho tracking-tight leading-[1.05] mb-6">
            Uma igreja feita de{" "}
            <span className="font-script text-cobalto italic font-extrabold text-5xl sm:text-7xl lg:text-[90px] inline-block -rotate-1">
              pessoas.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-marinho/80 font-normal leading-relaxed max-w-xl mb-8">
            {siteConfig.slogans.secondary} Venha fazer parte da nossa família em Vila Isabel, Resende.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href="#visita" variant="primary" size="lg" className="px-10 h-14 text-base font-bold shadow-sm hover:scale-[1.02]">
              Planeje sua visita
            </Button>
            <Button href="#cultos" variant="ghost" size="lg" className="h-14 text-base font-semibold">
              Assistir ao vivo
            </Button>
          </div>
        </div>

        {/* Coluna Direita: Mosaico Assimétrico com Rotações Táteis */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
          {/* Foto Principal */}
          <div className="w-[82%] rounded-3xl overflow-hidden border-4 border-white shadow-elevation-2 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Foto 1 */}
          </div>
          {/* Foto Secundária 2 */}
          <div className="absolute -bottom-4 left-2 w-48 sm:w-56 rounded-2xl overflow-hidden border-4 border-white shadow-elevation-2 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            {/* Foto 2 */}
          </div>
          {/* Foto Secundária 3 */}
          <div className="absolute -top-4 right-2 w-44 sm:w-52 rounded-2xl overflow-hidden border-4 border-white shadow-elevation-2 z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            {/* Foto 3 */}
          </div>
        </div>
      </Container>

      {/* Faixa inferior translúcida */}
      <NextServiceBar services={services} />
    </section>
  );
}
```

---

### `components/home/NextServiceBar.tsx` (component, request-response / transform)

**Analog:** `components/ui/Card.tsx` (lines 43-54) & `stitch-desktop.html` (lines 140-151)

**Imports & Structure pattern:**
```typescript
import React from "react";
import Link from "next/link";
import { Service } from "@/content/services";
import { siteConfig } from "@/content/site";
import { calculateNextService } from "@/lib/utils/services";
import { Container } from "@/components/ui/Container";

interface NextServiceBarProps {
  services: Service[];
}

export function NextServiceBar({ services }: NextServiceBarProps) {
  const next = calculateNextService(services);

  return (
    <div className="w-full border-t border-marinho/10 bg-white/70 backdrop-blur-md mt-10">
      <Container size="xl" className="py-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-marinho/80 gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-verde animate-pulse shrink-0" />
          <span className="font-bold text-marinho uppercase tracking-wider">Próximo Encontro:</span>
          <span>{next.service.title} &bull; {next.formattedDate}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-marinho/70">{siteConfig.location.address} – {siteConfig.location.neighborhood}</span>
          <Link href="#cultos" className="text-cobalto font-bold underline hover:text-marinho transition-colors">
            Ver todos os horários
          </Link>
        </div>
      </Container>
    </div>
  );
}
```

---

### `app/layout.tsx` (component / layout, request-response)

**Analog:** `app/layout.tsx` (lines 24-38)

**Integration pattern:**
```typescript
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${caveat.variable} scroll-smooth`}>
      <body className="bg-white text-marinho font-sans antialiased selection:bg-gelo selection:text-marinho flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
```

---

## Shared Patterns

### Client Component State & Lifecycle Pattern
**Source:** `components/layout/HeaderScrollWatcher.tsx` (lines 1-27)
**Apply to:** `hooks/useScrollspy.ts`, `components/layout/MobileDrawer.tsx`, `components/layout/Header.tsx`
```typescript
"use client";

import React, { useEffect, useState } from "react";

// Standard lifecycle cleanup pattern
useEffect(() => {
  const handler = () => { /* event logic */ };
  window.addEventListener("event", handler, { passive: true });
  return () => window.removeEventListener("event", handler);
}, []);
```

### Button & Action Link Pattern
**Source:** `components/ui/Button.tsx` (lines 22-47)
**Apply to:** `components/layout/FloatingWhatsApp.tsx`, `components/home/Hero.tsx`, `components/layout/MobileDrawer.tsx`
```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cobalto focus:ring-offset-2";
```

### Content & Configuration Access
**Source:** `content/index.ts` & `components/layout/Footer.tsx` (lines 3, 16-22)
**Apply to:** `components/home/Hero.tsx`, `components/home/NextServiceBar.tsx`, `components/layout/FloatingWhatsApp.tsx`
```typescript
import { siteConfig, services } from "@/content";
```

---

## No Analog Found

All required files have existing tracked analogs in the codebase.

| File | Role | Data Flow | Reason |
|---|---|---|---|
| *None* | — | — | Full coverage across UI components, layout wrappers, and typed content |

---

## Metadata

**Analog search scope:** `app/`, `components/`, `content/`, `stitch-desktop.html`, `stitch-mobile.html`
**Files scanned:** 22
**Pattern extraction date:** 2026-09-29
