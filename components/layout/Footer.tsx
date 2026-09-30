import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-marinho text-white pt-20 pb-12 border-t border-marinho/20">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna 1: Identidade e Redes */}
          <div className="flex flex-col gap-4">
            <Logo light />
            <p className="font-script text-ceu text-2xl mt-1">
              &ldquo;{siteConfig.slogans.secondary}&rdquo;
            </p>
            <p className="text-sm text-gelo/70 leading-relaxed max-w-sm">
              Uma comunidade de fé acolhedora, vibrante e fundamentada nas Sagradas Escrituras em Resende/RJ.
            </p>
            {/* Links de Redes Sociais */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da IBBE (abre em nova aba)"
                className="text-gelo hover:text-ceu transition-colors motion-reduce:transition-none text-sm font-semibold underline underline-offset-4 py-2 inline-block min-h-[44px]"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube da IBBE (abre em nova aba)"
                className="text-gelo hover:text-ceu transition-colors motion-reduce:transition-none text-sm font-semibold underline underline-offset-4 py-2 inline-block min-h-[44px]"
              >
                YouTube
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook da IBBE (abre em nova aba)"
                className="text-gelo hover:text-ceu transition-colors motion-reduce:transition-none text-sm font-semibold underline underline-offset-4 py-2 inline-block min-h-[44px]"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-6">
              Navegação
            </h4>
            <nav aria-label="Navegação secundária do rodapé">
              <ul className="space-y-1 text-sm text-gelo/80">
                <li>
                  <Link href="#inicio" className="hover:text-white transition-colors motion-reduce:transition-none py-2 inline-block">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="#historia" className="hover:text-white transition-colors motion-reduce:transition-none py-2 inline-block">
                    Nossa História
                  </Link>
                </li>
                <li>
                  <Link href="#cultos" className="hover:text-white transition-colors motion-reduce:transition-none py-2 inline-block">
                    Horários de Cultos
                  </Link>
                </li>
                <li>
                  <Link href="#eventos" className="hover:text-white transition-colors motion-reduce:transition-none py-2 inline-block">
                    Programação & Eventos
                  </Link>
                </li>
                <li>
                  <Link href="#grupos" className="hover:text-white transition-colors motion-reduce:transition-none py-2 inline-block">
                    Pequenos Grupos (PGMs)
                  </Link>
                </li>
                <li>
                  <Link href="#visita" className="hover:text-white transition-colors motion-reduce:transition-none py-2 inline-block">
                    Planeje sua Visita
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Coluna 3: Cultos e Encontros */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-6">
              Cultos & Encontros
            </h4>
            <div className="space-y-3 text-sm text-gelo/80">
              <div>
                <p className="font-semibold text-white">Domingo às 09:00</p>
                <p className="text-xs text-gelo/60">Escola Bíblica Dominical (EBD)</p>
              </div>
              <div>
                <p className="font-semibold text-white">Domingo às 19:00</p>
                <p className="text-xs text-gelo/60">Culto de Celebração</p>
              </div>
              <div>
                <p className="font-semibold text-white">Quinta-feira às 19:30</p>
                <p className="text-xs text-gelo/60">Culto de Oração e Doutrina</p>
              </div>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-verde/20 text-verde rounded-full text-xs font-semibold">
                  Portas Abertas
                </span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Onde Estamos */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-6">
              Onde Estamos
            </h4>
            <div className="space-y-3 text-sm text-gelo/80 leading-relaxed">
              <p className="font-semibold text-white">{siteConfig.name}</p>
              <p>
                {siteConfig.location.address} <br />
                {siteConfig.location.neighborhood} — {siteConfig.location.city}/{siteConfig.location.state} <br />
                CEP: {siteConfig.location.cep}
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-ceu hover:underline"
                >
                  Abrir no Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Divisória e Faixa Inferior */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gelo/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>
              &copy; {siteConfig.foundationDate.split("/")[2]}–{currentYear} {siteConfig.name}. Todos os direitos reservados.
            </p>
            <span className="hidden sm:inline">&bull;</span>
            <Link href="/privacidade" className="hover:text-white underline underline-offset-2 transition-colors">
              Privacidade & LGPD
            </Link>
          </div>
          <p className="italic">
            &ldquo;{siteConfig.slogans.primary}&rdquo;
          </p>
        </div>
      </Container>
    </footer>
  );
}
