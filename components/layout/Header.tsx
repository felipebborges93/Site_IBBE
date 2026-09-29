import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { HeaderScrollWatcher } from "./HeaderScrollWatcher";

export function Header() {
  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "História", href: "#historia" },
    { label: "Cultos", href: "#cultos" },
    { label: "Eventos", href: "#eventos" },
    { label: "Grupos", href: "#grupos" },
    { label: "Como Chegar", href: "#visita" },
  ];

  return (
    <HeaderScrollWatcher>
      <Container size="lg">
        <div className="flex items-center justify-between">
          {/* Logotipo da IBBE */}
          <Logo />

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-marinho/80 hover:text-cobalto transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Planeje sua visita */}
          <div className="flex items-center gap-3">
            <Button
              href="#visita"
              variant="primary"
              size="sm"
              className="text-xs sm:text-sm font-semibold"
            >
              Planeje sua Visita
            </Button>
          </div>
        </div>
      </Container>
    </HeaderScrollWatcher>
  );
}
