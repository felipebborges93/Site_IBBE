import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import PrayerForm from "@/app/(public)/oracao/PrayerForm";

export function PrayerSection() {
  return (
    <section id="oracao" className="py-20 bg-gelo scroll-mt-20">
      <Container size="md">
        <SectionTitle
          highlight="Orar"
          subtitle="Compartilhe sua necessidade ou motivo de agradecimento. Nossa equipe de intercessão estará orando por você com sigilo e carinho."
          align="center"
        >
          Podemos Orar por você?
        </SectionTitle>

        <div className="mt-8 max-w-2xl mx-auto">
          <PrayerForm />
        </div>
      </Container>
    </section>
  );
}
