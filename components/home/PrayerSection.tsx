import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import PrayerForm from "@/app/(public)/oracao/PrayerForm";

export function PrayerSection() {
  return (
    <section id="oracao" className="py-20 bg-gelo scroll-mt-20 relative overflow-hidden">
      {/* Texture Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/images/patterns/pattern-10.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
      />
      
      <Container size="md" className="relative z-10">
        <SectionTitle
          highlight="Orar"
          subtitle="Compartilhe seu motivo de oração ou agradecimento. Nossa equipe pastoral e de intercessão acolhe cada mensagem com sigilo e carinho."
          align="center"
        >
          Podemos orar por você?
        </SectionTitle>

        <div className="mt-8 max-w-2xl mx-auto">
          <PrayerForm />
        </div>
      </Container>
    </section>
  );
}
