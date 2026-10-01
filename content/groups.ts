export interface Group {
  id: string;
  name: string;
  address: string;
  meetingSchedule: string;
  description?: string;
  neighborhood?: string;
}

export const groups: Group[] = [
  {
    id: "principe-da-paz",
    name: "Príncipe da Paz",
    address: "Rua Amazonas, 96 - Morada do Contorno",
    meetingSchedule: "Sexta-feira às 19h30",
    neighborhood: "Morada do Contorno",
    description: "Comunhão nos lares, estudo bíblico e oração mútua.",
  },
  {
    id: "ebenezer",
    name: "Ebenézer",
    address: "Rua Amazonas, nº 96 - Morada do Contorno",
    meetingSchedule: "Sábado às 16h00",
    neighborhood: "Morada do Contorno",
    description: "Acolhimento de famílias e crescimento na Palavra aos sábados.",
  },
  {
    id: "princesas-de-cristo",
    name: "Princesas de Cristo",
    address: "Local: Igreja Batista Bethel",
    meetingSchedule: "Quinta-feira às 19h30",
    neighborhood: "Vila Isabel (Igreja)",
    description: "Encontro feminino de edificação, partilha e intercessão.",
  },
  {
    id: "emanuel",
    name: "Emanuel",
    address: "Local: Igreja Batista Bethel",
    meetingSchedule: "Terça-feira às 19h30",
    neighborhood: "Vila Isabel (Igreja)",
    description: "Cuidado pastoral, comunhão fraterna e estudo bíblico.",
  },
  {
    id: "alianca-com-deus",
    name: "Aliança com Deus",
    address: "Rua Amapá, 490 - Morada do Contorno",
    meetingSchedule: "Quinta-feira às 19h30",
    neighborhood: "Morada do Contorno",
    description: "Fortalecendo laços de fé e amizade na comunidade.",
  },
  {
    id: "peniel",
    name: "Peniel",
    address: "Local: Igreja Batista Bethel",
    meetingSchedule: "Quinta-feira às 19h30",
    neighborhood: "Vila Isabel (Igreja)",
    description: "Buscando a face de Deus com oração e estudo das Escrituras.",
  },
  {
    id: "siao",
    name: "Sião",
    address: "Rua 13, nº 91",
    meetingSchedule: "Quintas-feiras às 19h30",
    neighborhood: "Vila Isabel",
    description: "Portas abertas para receber vizinhos e amigos com afeto.",
  },
];
