export interface Event {
  id: string;
  title: string;
  date: string;
  dayNumber: string;
  monthLabel: string;
  time?: string;
  location: string;
  description: string;
  category: "aniversario" | "conferencia" | "especial" | "retiro" | "social";
}

export const events: Event[] = [
  {
    id: "almoco-missionario-out",
    title: "Almoço Missionário",
    date: "18 de Outubro (Dom)",
    dayNumber: "18",
    monthLabel: "OUT • DOM",
    location: "Igreja Batista Bethel (Vila Izabel)",
    description: "Momento especial de comunhão e apoio aos projetos missionários da igreja.",
    category: "social",
  },
  {
    id: "aniversario-ibbe-26",
    title: "🎂 26º Aniversário da Igreja",
    date: "31 de Outubro e 01 de Novembro",
    dayNumber: "31",
    monthLabel: "OUT / NOV",
    location: "Igreja Batista Bethel (Vila Izabel)",
    description: "Celebração solene de 26 anos de história, fé e proclamação do evangelho em Resende.",
    category: "aniversario",
  },
  {
    id: "festa-missionaria-aibran",
    title: "Festa Missionária da AIBRAN",
    date: "07 de Novembro (Sáb)",
    dayNumber: "07",
    monthLabel: "NOV • SÁB",
    location: "Sediada na nossa igreja (IBBE)",
    description: "Encontro inspirador da Associação com louvor, testemunhos e visão missionária.",
    category: "especial",
  },
  {
    id: "frangao-beneficente",
    title: "Frangão Beneficente (Luís e Tiffany)",
    date: "15 de Novembro (Dom)",
    dayNumber: "15",
    monthLabel: "NOV • DOM",
    location: "Igreja Batista Bethel",
    description: "Ação beneficente em prol da obra com delicioso almoço compartilhado.",
    category: "social",
  },
  {
    id: "encontro-casais-namorados",
    title: "Encontro de Casais e Namorados",
    date: "28 de Novembro (Sáb)",
    dayNumber: "28",
    monthLabel: "NOV • SÁB",
    location: "Igreja Batista Bethel",
    description: "Edificação, diálogo e princípios bíblicos para relacionamentos saudáveis e duradouros.",
    category: "especial",
  },
  {
    id: "almoco-missionario-dez-ebd",
    title: "Almoço Missionário + Encerramento das Lições da EBD",
    date: "06 de Dezembro (Dom)",
    dayNumber: "06",
    monthLabel: "DEZ • DOM",
    location: "Igreja Batista Bethel",
    description: "Almoço missionário acompanhado do encerramento das lições e avaliação da Escola Bíblica Dominical.",
    category: "especial",
  },
  {
    id: "dia-da-biblia-pgzao",
    title: "Dia da Bíblia + PGzão",
    date: "13 de Dezembro (Dom)",
    dayNumber: "13",
    monthLabel: "DEZ • DOM",
    location: "Bairro Vila Izabel e Igreja",
    description: "Evangelismo no bairro pela manhã, seguido por grande celebração dos Pequenos Grupos (PGzão) com lanche compartilhado.",
    category: "especial",
  },
  {
    id: "assembleia-e-culto-natal",
    title: "Assembleia Matinal + Culto de Natal",
    date: "20 de Dezembro (Dom)",
    dayNumber: "20",
    monthLabel: "DEZ • DOM",
    location: "Igreja Batista Bethel",
    description: "Assembleia matinal para eleição da nova comissão de indicação e lindo Culto de Natal à noite.",
    category: "especial",
  },
  {
    id: "culto-virada-ceia",
    title: "Culto da Virada com Ceia",
    date: "31 de Dezembro (Qui)",
    dayNumber: "31",
    monthLabel: "DEZ • QUI",
    location: "Igreja Batista Bethel",
    description: "Culto de gratidão e consagração do novo ano com celebração da Ceia do Senhor.",
    category: "especial",
  },
];
