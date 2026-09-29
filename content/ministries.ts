export interface Ministry {
  id: string;
  name: string;
  leader: string;
  description: string;
  icon?: string;
}

export const ministries: Ministry[] = [
  {
    id: "louvor",
    name: "Louvor & Adoração",
    leader: "[PLACEHOLDER: Líder do Louvor]",
    description: "Conduz a igreja na adoração a Deus com excelência musical, reverência e alegria.",
    icon: "MusicNotes",
  },
  {
    id: "kids",
    name: "Bethel Kids (Ministério Infantil)",
    leader: "[PLACEHOLDER: Líder do Ministério Infantil]",
    description: "Discipulado de crianças de forma lúdica, criativa e alinhada aos ensinamentos bíblicos durante os cultos.",
    icon: "Baby",
  },
  {
    id: "mulheres",
    name: "Mulheres de Fé",
    leader: "[PLACEHOLDER: Líder do Ministério de Mulheres]",
    description: "Fortalecimento espiritual, comunhão e apoio mútuo entre as mulheres da congregação.",
    icon: "Heart",
  },
  {
    id: "homens",
    name: "Homens de Coragem",
    leader: "[PLACEHOLDER: Líder do Ministério de Homens]",
    description: "Encontros de oração, confraternização e discipulado para homens líderes em seus lares.",
    icon: "Shield",
  },
  {
    id: "acao-social",
    name: "Ação Social & Integração",
    leader: "[PLACEHOLDER: Líder da Ação Social]",
    description: "Amor prático através de doações de cestas básicas, roupas e amparo às famílias necessitadas de Resende.",
    icon: "HandHeart",
  },
];
