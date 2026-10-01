export interface Ministry {
  id: string;
  name: string;
  description: string;
  leader?: string;
  icon?: string;
}

export const ministries: Ministry[] = [
  {
    id: "louvor",
    name: "Louvor & Adoração",
    description: "Música congregacional que direciona o olhar para Jesus e expressa a voz de toda a igreja reunida.",
  },
  {
    id: "kids",
    name: "Bethel Kids",
    description: "Cuidado afetuoso e aprendizado bíblico lúdico para as crianças enquanto os pais celebram o culto.",
  },
  {
    id: "juventude",
    name: "Juventude Bethel",
    description: "Amizade verdadeira, encontros descontraídos e engajamento social de jovens e adolescentes.",
  },
  {
    id: "mulheres",
    name: "Mulheres com Propósito",
    description: "Encontros fraternos, intercessão, apoio emocional mútuo e acolhimento feminino em todas as idades.",
  },
  {
    id: "homens",
    name: "Homens de Honra",
    description: "Café mensal, incentivo para pais e esposos exercerem liderança de serviço e integridade no lar.",
  },
  {
    id: "acao-social",
    name: "Ação Social Vila Izabel",
    description: "Assistência emergencial, distribuição de cestas e suporte humanitário a quem mais necessita na cidade.",
  },
  {
    id: "comunicacao",
    name: "Comunicação & Mídia",
    description: "Transmissões ao vivo, fotografia e sonorização com carinho para alcançar quem está longe do templo.",
  },
  {
    id: "acolhimento",
    name: "Boas-Vindas & Acolhimento",
    description: "O primeiro aperto de mão e o abraço na porta: orientar os visitantes e garantir que sintam-se em casa.",
  },
];
