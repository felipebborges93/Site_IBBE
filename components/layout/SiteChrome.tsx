"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTelao = pathname?.startsWith("/telao");

  if (isTelao) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-20 outline-none">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
