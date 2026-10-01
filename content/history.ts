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
  middleText: string;
  missionsText: string;
  closingText: string;
  pastors: PastorReference[];
  timeline: Milestone[];
}

export const historyData: HistoryData = {
  title: "Uma história de amor, alegria e esperança",
  themeVerse: {
    verse:
      "Os olhos do Senhor estão atentos sobre toda a terra para fortalecer aqueles que lhe dedicam totalmente o coração.",
    reference: "2 Crônicas 16.9a",
  },
  jeremiasVerse: {
    verse:
      "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.",
    reference: "Jeremias 29:11",
  },
  foundationText:
    "Somos a Igreja Batista Bethel, organizada em Resende desde 28 de outubro de 2000. Nosso trabalho começou no coração de Deus e ganhou forma pelas mãos de 28 irmãos corajosos, com o desejo de levar o evangelho às crianças da periferia, na rua B do bairro Toyota, nossa primeira sede.",
  capelaText:
    'Três anos depois, com o apoio de missionários americanos, nos mudamos para um grande terreno na Vila Isabel. Ali construímos, em apenas cinco dias, a capela onde estamos até hoje, inaugurada em 7 de novembro de 2003 com a celebração do primeiro casamento. Nascia a nossa querida "Igrejinha do Cantão".',
  middleText:
    "Desde então, vimos os batismos acontecerem, novos membros chegarem e novos ministérios surgirem, sempre contemplando a mão do Senhor Jesus agindo em nosso meio.",
  missionsText:
    "Somos uma igreja que ama missões, comprometida em alcançar pessoas com o Evangelho e transformar crentes em discípulos maduros e frutíferos. Agradecemos a Deus pela dedicação dos pastores Paulo de Souza Neto e João Carlos Franco, de suas famílias e dos líderes e obreiros fiéis que cooperaram para esta obra.",
  closingText:
    'Olhamos para trás com gratidão e para frente com coragem, certos de que "os olhos do Senhor estão atentos sobre toda a terra para fortalecer aqueles que lhe dedicam totalmente o coração" (2 Crônicas 16.9a). Seguimos firmes, aguardando o dia em que o Senhor virá nos buscar.',
  pastors: [
    {
      name: "Pr. Paulo de Souza Neto",
      role: "Pastor Fundador",
      period: "2000 - 2004",
      note: "Pioneiro da fundação no bairro Toyota e da conquista do templo em Vila Izabel.",
    },
    {
      name: "Pr. João Carlos Franco",
      role: "Pastor Emérito",
      period: "2004 - 2018",
      note: "Conduziu a consolidação da igreja e o crescimento dos ministérios por mais de uma década.",
    },
  ],
  timeline: [
    {
      year: "2000",
      title: "Fundação com 28 irmãos",
      description: "Início dos trabalhos no bairro Toyota com foco no alcance de crianças e famílias.",
    },
    {
      year: "2003",
      title: "A Capela dos 5 Dias",
      description: "Mudança para a Vila Isabel e construção da capela histórica em mutirão solidário.",
    },
  ],
};
