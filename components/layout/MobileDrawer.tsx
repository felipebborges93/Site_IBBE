"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "@phosphor-icons/react";
import { Logo } from "./Logo";

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeId?: string;
}

export function MobileDrawer({ isOpen, onClose, activeId }: MobileDrawerProps) {
  const drawerRef = React.useRef<HTMLElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  // Trava de rolagem no body, escape listener e focus trap
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Foco inicial no botão fechar
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navLinks = [
    { label: "Início", href: "#inicio", id: "inicio" },
    { label: "Nossa história", href: "#historia", id: "historia" },
    { label: "Cultos", href: "#cultos", id: "cultos" },
    { label: "Eventos", href: "#eventos", id: "eventos" },
    { label: "Lives", href: "#lives", id: "lives" },
    { label: "PGMs", href: "#grupos", id: "grupos" },
    { label: "Ministérios", href: "#ministerios", id: "ministerios" },
    { label: "Ação Social", href: "#acao-social", id: "acao-social" },
    { label: "Oração", href: "#oracao", id: "oracao" },
    { label: "Sou Novo", href: "#visita", id: "visita" },
    { label: "Contato", href: "#contato", id: "contato" },
  ];

  return (
    <>
      {/* Backdrop com desfoque e fade */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer lateral deslizando da direita */}
      <aside
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação móvel"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-marinho text-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out motion-reduce:transition-none motion-reduce:transform-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Topo: Logo e Botão Fechar com touch target acessível */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="brightness-0 invert scale-95 origin-left">
            <Logo />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="w-12 h-12 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cobalto"
          >
            <X size={26} weight="bold" />
          </button>
        </div>

        {/* Lista de navegação com rolagem se a tela for muito pequena */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block py-2.5 px-3 rounded-md text-lg font-semibold tracking-tight transition-colors ${
                  isActive
                    ? "text-ceu bg-white/10 font-bold"
                    : "text-white/85 hover:text-ceu hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Rodapé do Drawer: Endereço resumido e CTA Visitar */}
        <div className="px-6 py-6 border-t border-white/10 bg-marinho space-y-4">
          <div className="text-xs text-white/60 space-y-0.5">
            <p className="font-semibold text-white/80">Igreja Batista Bethel</p>
            <p>Rua das Acácias, 120 — Vila Isabel</p>
            <p>Resende - RJ</p>
          </div>
          <Link
            href="#visita"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-cobalto hover:bg-cobalto/90 text-white text-sm font-bold shadow-md transition-all active:scale-95"
          >
            <span>Planeje sua visita</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </aside>
    </>
  );
}
