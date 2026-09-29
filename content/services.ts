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
    id: "celebracao",
    title: "Culto de Celebração",
    day: "Domingo",
    time: "19:00",
    description: "Nosso encontro congregacional com louvor, adoração e ministração expositiva da Palavra.",
    icon: "Church",
  },
  {
    id: "ebd",
    title: "Escola Bíblica Dominical (EBD)",
    day: "Domingo",
    time: "09:00",
    description: "Estudo bíblico em classes para todas as idades, fortalecendo a fé e o discipulado.",
    icon: "BookOpen",
  },
  {
    id: "oracao",
    title: "Culto de Oração e Doutrina",
    day: "Quinta-feira",
    time: "19:30",
    description: "Momento de clamor intercessório pelas famílias, igreja e aprofundamento das Escrituras.",
    icon: "HandsPraying",
  },
];
