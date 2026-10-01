import React from "react";
import Link from "next/link";
import { Service } from "@/content/services";
import { calculateNextService } from "@/lib/utils/services";
import { Container } from "@/components/ui/Container";

import { siteConfig } from "@/content/site";

export interface NextServiceBarProps {
  services: Service[];
}

export function NextServiceBar({ services }: NextServiceBarProps) {
  const nextServiceInfo = calculateNextService(services);

  return (
    <div className="w-full border-t border-marinho/10 bg-white/70 backdrop-blur-md mt-10">
      <Container size="xl" className="py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-marinho/80 gap-3">
          {/* Lado Esquerdo: Indicador verde pulsante e dados do próximo culto */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full bg-verde animate-pulse motion-reduce:animate-none shrink-0" />
            <span className="font-bold text-marinho uppercase tracking-wider text-xs">
              Próximo Encontro:
            </span>
            <span className="font-medium text-marinho">
              {nextServiceInfo.service.title} • {nextServiceInfo.formattedDate}
            </span>
          </div>

          {/* Lado Direito: Endereço e Link de horários */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 pt-1 sm:pt-0 border-t sm:border-t-0 border-marinho/10">
            <span className="hidden md:inline text-marinho/70">
              {siteConfig.location.address} – {siteConfig.location.neighborhood}
            </span>
            <Link
              href="#cultos"
              className="text-cobalto font-bold underline hover:text-marinho transition-colors min-h-[44px] inline-flex items-center py-2"
            >
              Ver todos os horários
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
