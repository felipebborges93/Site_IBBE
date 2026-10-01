import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('content/history.ts', 'utf-8');

content = content.replace(
  'A Igreja Batista Bethel em Resende nasceu em 28 de outubro de 2000, fruto de uma semente de amor e fé plantada por 28 irmãos no bairro Toyota. Sob a liderança do Pr. Paulo de Souza Neto e em comunhão com a PIB de Engenheiro Passos, a congregação foi emancipada para glorificar a Deus na região das Agulhas Negras.',
  'A Igreja Batista Bethel em Resende nasceu em 28 de outubro de 2000, desenvolvendo-se pela instrumentalidade de 28 irmãos corajosos. Tudo começou com a preocupação de expandir o evangelho e alcançar o coração das crianças da periferia da cidade, especificamente na rua B do bairro Toyota, que se tornaria a sede provisória da nossa igreja.'
);

content = content.replace(
  'Em 2003, através de um verdadeiro milagre de união, dedicação e graça divina, os irmãos adquiriram o terreno na Rua das Acácias, Vila Isabel. Em um mutirão histórico de apenas 5 dias, a capela inicial foi erguida e inaugurada com louvores e lágrimas de gratidão em 7 de novembro de 2003.',
  'Três anos depois (2003), com o apoio de missionários americanos, um pequeno grupo de irmãos se deslocou ousadamente para um grande terreno no emergente bairro Vila Isabel. Ali construímos em apenas 5 dias a nossa atual capela, sendo o culto de inauguração na noite de 07 de novembro de 2003. Aos poucos, construíamos nossa identidade como "Igrejinha do cantão".'
);

content = content.replace(
  /\{\n\s*year: "Hoje",\n\s*title: "Uma Igreja Feita de Pessoas",\n\s*description: "Fortalecendo PGMs, alcançando os bairros de Resende com amor e hospitalidade genuína\."\n\s*\}/,
  `{
      year: "2025",
      title: "25 Anos de uma Grande Família",
      description: "Celebração de 25 anos de abraços, amizades e fé incondicional, mantendo nossa essência de uma igreja feita de pessoas."
    },
    {
      year: "Hoje",
      title: "Uma Igreja Feita de Pessoas",
      description: "Fortalecendo PGMs, alcançando os bairros de Resende com amor e hospitalidade genuína."
    }`
);

writeFileSync('content/history.ts', content);
