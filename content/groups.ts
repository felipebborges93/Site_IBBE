export interface Group {
  id: string;
  name: string;
  neighborhood: string;
  meetingDay: string;
  meetingTime: string;
  description: string;
  leader?: string;
  contactPhone?: string;
}

export const groups: Group[] = [
  {
    id: "pgm-vila-isabel",
    name: "PGM Família & Esperança",
    neighborhood: "Vila Isabel",
    meetingDay: "Terça-feira",
    meetingTime: "19:30",
    description: "Reunião para famílias com momentos de partilha sincera, oração e espaço lúdico para as crianças.",
  },
  {
    id: "pgm-manejo",
    name: "PGM Juventude & Propósito",
    neighborhood: "Manejo / Cidade Alegria",
    meetingDay: "Quarta-feira",
    meetingTime: "20:00",
    description: "Roda de conversa descontraída sobre carreira, dúvidas, fé prática e amizades duradouras.",
  },
  {
    id: "pgm-campos-eliseos",
    name: "PGM Graça & Comunhão",
    neighborhood: "Campos Elíseos / Centro",
    meetingDay: "Quinta-feira",
    meetingTime: "19:30",
    description: "Estudo simples dos Salmos, oração mútua e acolhimento para quem mora ou trabalha na região central.",
  },
];
