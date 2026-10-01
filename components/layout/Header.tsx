"use client";

import React, { useState } from "react";
import Link from "next/link";
import { List } from "@phosphor-icons/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { HeaderScrollWatcher } from "./HeaderScrollWatcher";
import { MobileDrawer } from "./MobileDrawer";
import { useScrollspy } from "@/hooks/useScrollspy";

const navLinks = [
  { label: "Início", href: "#inicio", id: "inicio" },
  { label: "Cultos", href: "#cultos", id: "cultos" },
  { label: "Lives", href: "#lives", id: "lives" },
  { label: "Nossa história", href: "#historia", id: "historia" },
  { label: "Eventos", href: "#eventos", id: "eventos" },
  { label: "PGMs", href: "#grupos", id: "grupos" },
  { label: "Ministérios", href: "#ministerios", id: "ministerios" },
  { label: "Ação Social", href: "#acao-social", id: "acao-social" },
  { label: "Oração", href: "#oracao", id: "oracao" },
  { label: "Sou Novo", href: "#visita", id: "visita" },
  { label: "Contato", href: "#contato", id: "contato" },
];

const sectionIds = navLinks.map((link) => link.id);

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const activeId = useScrollspy(sectionIds, "-20% 0px -70% 0px");

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <HeaderScrollWatcher>
        <Container size="xl">
          <div className="flex items-center justify-between gap-6 xl:gap-8">
            {/* Logotipo da IBBE */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* Navegação Desktop (visível a partir de telas xl) */}
            <nav aria-label="Navegação principal" className="hidden xl:flex items-center gap-3 2xl:gap-5 flex-1 justify-center">

              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap text-sm transition-all duration-150 py-2 min-h-[44px] border-b-2 ${
                      isActive
                        ? "text-cobalto font-bold border-cobalto"
                        : "text-marinho/80 font-medium border-transparent hover:text-cobalto hover:border-cobalto/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTAs e Gatilho Mobile */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Botão CTA Principal */}
              <Button
                href="#visita"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex whitespace-nowrap text-xs font-semibold px-4 py-2"
              >
                Planeje sua Visita
              </Button>

              {/* Botão de Hambúrguer Mobile (visível abaixo de xl) */}
              <button
                type="button"
                onClick={openDrawer}
                aria-label="Abrir menu de navegação"
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-nav-drawer"
                className="xl:hidden w-12 h-12 flex items-center justify-center rounded-lg text-marinho hover:bg-marinho/5 focus:outline-none focus:ring-2 focus:ring-cobalto transition-colors motion-reduce:transition-none min-h-[44px]"
              >
                <List size={28} weight="bold" />
              </button>
            </div>
          </div>
        </Container>
      </HeaderScrollWatcher>

      {/* Menu Lateral Mobile (Drawer) */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        activeId={activeId}
      />
    </>
  );
}
