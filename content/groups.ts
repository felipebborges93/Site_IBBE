export interface Group {
  id: string;
  name: string;
  neighborhood: string;
  leader: string;
  meetingDay: string;
  meetingTime: string;
  contactPhone: string;
}

export const groups: Group[] = [
  {
    id: "pgm-vila-isabel",
    name: "PGM Vila Isabel",
    neighborhood: "Vila Isabel",
    leader: "[PLACEHOLDER: Líder PGM Vila Isabel]",
    meetingDay: "Quarta-feira",
    meetingTime: "20:00",
    contactPhone: "[PLACEHOLDER: Telefone de contato]",
  },
  {
    id: "pgm-toyota",
    name: "PGM Toyota",
    neighborhood: "Toyota",
    leader: "[PLACEHOLDER: Líder PGM Toyota]",
    meetingDay: "Quarta-feira",
    meetingTime: "19:30",
    contactPhone: "[PLACEHOLDER: Telefone de contato]",
  },
  {
    id: "pgm-alvorada",
    name: "PGM Morada da Colina / Alvorada",
    neighborhood: "Morada da Colina",
    leader: "[PLACEHOLDER: Líder PGM Colina]",
    meetingDay: "Sexta-feira",
    meetingTime: "20:00",
    contactPhone: "[PLACEHOLDER: Telefone de contato]",
  },
];
