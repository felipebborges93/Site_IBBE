export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  category: "aniversario" | "conferencia" | "especial" | "retiro";
  isFeatured?: boolean;
}

export const events: Event[] = [
  {
    id: "aniversario-ibbe",
    title: "Aniversário de Fundação da IBBE",
    date: "28 de Outubro",
    time: "19:00",
    location: "Templo Sede (Rua das Acácias, 120 - Vila Isabel)",
    description: "Celebração anual de gratidão a Deus pelos anos de ministério, comunhão e fidelidade.",
    category: "aniversario",
    isFeatured: true,
  },
  {
    id: "conferencia-familia",
    title: "[PLACEHOLDER: Conferência da Família / Retiro Espiritual]",
    date: "[PLACEHOLDER: Data do próximo evento]",
    time: "[PLACEHOLDER: Horário]",
    location: "[PLACEHOLDER: Local]",
    description: "[PLACEHOLDER: Descrição do evento especial da igreja]",
    category: "conferencia",
    isFeatured: false,
  },
];
