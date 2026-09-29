export interface Event {
  id: string;
  title: string;
  date: string;
  isoDate?: string;
  time?: string;
  location: string;
  description: string;
  category: "aniversario" | "conferencia" | "especial" | "retiro" | "social";
  isFeatured?: boolean;
}

export const events: Event[] = [
  {
    id: "noite-familia-bethel",
    title: "Noite da Família Bethel",
    date: "24 de Maio",
    isoDate: "2026-05-24",
    time: "19:00",
    location: "Capela de Vila Isabel (Rua das Acácias, 120)",
    description: "Jantar comunitário com conversa aberta sobre relacionamentos saudáveis, louvor acústico e espaço para as crianças brincarem.",
    category: "especial",
    isFeatured: true,
  },
  {
    id: "tarde-alegria-kids",
    title: "Tarde da Alegria: Bethel Kids",
    date: "08 de Junho",
    isoDate: "2026-06-08",
    time: "14:30",
    location: "Pátio Bethel",
    description: "Atividades ao ar livre, teatro de fantoches, lanche saudável e contação de histórias bíblicas para todas as crianças do bairro.",
    category: "especial",
    isFeatured: false,
  },
  {
    id: "mutirao-acao-social",
    title: "Mutirão de Ação Social Vila Isabel",
    date: "22 de Junho",
    isoDate: "2026-06-22",
    time: "09:00 às 15:00",
    location: "Praça de Vila Isabel",
    description: "Apoio comunitário com doação de alimentos, roupas, aferição de pressão arterial e orientação fraterna às famílias da comunidade.",
    category: "social",
    isFeatured: true,
  },
  {
    id: "aniversario-ibbe",
    title: "Aniversário de 26 Anos da IBBE",
    date: "28 de Outubro",
    isoDate: "2026-10-28",
    time: "19:00",
    location: "Templo Sede (Rua das Acácias, 120 - Vila Isabel)",
    description: "Celebração anual de gratidão a Deus pelos anos de ministério, comunhão e fidelidade em Resende.",
    category: "aniversario",
    isFeatured: true,
  },
];

