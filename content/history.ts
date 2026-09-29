export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface PastorReference {
  name: string;
  role: string;
  period?: string;
  note?: string;
}

export interface HistoryData {
  title: string;
  themeVerse: {
    verse: string;
    reference: string;
  };
  jeremiasVerse: {
    verse: string;
    reference: string;
  };
  foundationText: string;
  capelaText: string;
  pastors: PastorReference[];
  timeline: Milestone[];
}

export const historyData: HistoryData = {
  title: "Nossa História de Fé e Propósito",
  themeVerse: {
    verse: "Porque, quanto ao Senhor, seus olhos passam por toda a terra, para mostrar-se forte para com aqueles cujo coração é totalmente dele.",
    reference: "2 Crônicas 16.9a",
  },
  jeremiasVerse: {
    verse: "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.",
    reference: "Jeremias 29:11",
  },
  foundationText:
    "A Igreja Batista Bethel em Resende nasceu em 28 de outubro de 2000, fruto de uma semente de amor e fé plantada por 28 irmãos no bairro Toyota. Sob a liderança do Pr. Paulo de Souza Neto e em comunhão com a PIB de Engenheiro Passos, a congregação foi emancipada para glorificar a Deus na região das Agulhas Negras.",
  capelaText:
    "Em 2003, através de um verdadeiro milagre de união, dedicação e graça divina, os irmãos adquiriram o terreno na Rua das Acácias, Vila Isabel. Em um mutirão histórico de apenas 5 dias, a capela inicial foi erguida e inaugurada com louvores e lágrimas de gratidão em 7 de novembro de 2003.",
  pastors: [
    {
      name: "Pr. Paulo de Souza Neto",
      role: "Pastor Fundador",
      period: "2000 - 2004",
      note: "Pioneiro da fundação no bairro Toyota e da conquista do templo em Vila Isabel.",
    },
    {
      name: "Pr. João Carlos Franco",
      role: "Pastor Emérito",
      period: "2004 - 2018",
      note: "Conduziu a consolidação da igreja e o crescimento dos ministérios por mais de uma década.",
    },
    {
      name: "Pr. Alexandre Moura",
      role: "Pastor Titular",
      period: "2018 - Presente",
      note: "Lidera a expansão comunitária, pequenos grupos e a visão de uma igreja feita de pessoas.",
    },
  ],
  timeline: [
    {
      year: "2000",
      title: "Fundação com 28 irmãos",
      description: "Emancipação da congregação no bairro Toyota sob a presidência do Pr. Paulo de Souza Neto.",
    },
    {
      year: "2003",
      title: "A Capela dos 5 Dias",
      description: "Mudança para Vila Isabel e construção milagrosa do templo em um mutirão de fé coletivo.",
    },
    {
      year: "2020",
      title: "Celebração de 20 Anos",
      description: "Duas décadas de proclamação do evangelho, acolhimento de famílias e serviço ao próximo.",
    },
    {
      year: "Hoje",
      title: "Uma Igreja Feita de Pessoas",
      description: "Fortalecendo PGMs, alcançando os bairros de Resende com amor e hospitalidade genuína.",
    },
  ],
};
