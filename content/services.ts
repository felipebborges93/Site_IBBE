export interface Service {
  id: string;
  title: string;
  day: string;
  time: string;
  description: string;
  icon?: string;
}

export const services: Service[] = [
  {
    id: "culto-manha",
    title: "Culto da Manhã",
    day: "Domingo",
    time: "08:30",
    description: "Nosso encontro congregacional com louvor, adoração e ministração expositiva da Palavra pela manhã.",
    icon: "Church",
  },
  {
    id: "ebd",
    title: "Escola Bíblica Dominical (EBD)",
    day: "Domingo",
    time: "10:00",
    description: "Estudo bíblico em classes para todas as idades (10h às 11h), fortalecendo a fé e o discipulado.",
    icon: "BookOpen",
  },
  {
    id: "culto-noite",
    title: "Culto da Noite",
    day: "Domingo",
    time: "18:00",
    description: "Nosso encontro congregacional com louvor, adoração e ministração expositiva da Palavra à noite.",
    icon: "Church",
  },
  {
    id: "bethel-kids",
    title: "Bethel Kids",
    day: "Quinta-feira",
    time: "19:30",
    description: "Ministério infantil na igreja com atividades seguras e ensinamentos bíblicos para as crianças.",
    icon: "UsersThree",
  },
  {
    id: "sexta-na-brecha",
    title: "Sexta na Brecha",
    day: "Sexta-feira",
    time: "07:30",
    description: "Reunião de oração pela nossa igreja, pela nossa cidade e pelos pedidos de oração enviados.",
    icon: "HandsPraying",
  },
  {
    id: "pgm",
    title: "Pequenos Grupos (PGMs)",
    day: "Durante a semana",
    time: "Vários horários",
    description: "Reuniões nos lares durante a semana para comunhão, estudo da Palavra e oração.",
    icon: "Users",
  },
];
