import PrayerForm from "./PrayerForm";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Pedidos de Oração | IBBE",
  description: "Deixe seu pedido de oração. Nossa igreja estará orando por você.",
};

export default function OracaoPage() {
  return (
    <div className="pt-32 pb-20 bg-gelo-light min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <SectionTitle
            highlight="Orar"
            subtitle="Compartilhe sua necessidade e nossa equipe de intercessão estará orando."
            align="center"
          >
            Estamos aqui para Orar por você
          </SectionTitle>
        </div>
        
        <PrayerForm />
      </div>
    </div>
  );
}
