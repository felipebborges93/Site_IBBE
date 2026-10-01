export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "roupas",
    question: "Como devo me vestir para ir a um culto?",
    answer: "Venha como se sentir mais confortável! Nossa comunidade é acolhedora e informal. Não há código de vestimenta obrigatório.",
  },
  {
    id: "criancas",
    question: "Existe espaço preparado para crianças durante o culto?",
    answer: "Sim! Temos o Bethel Kids com voluntários dedicados, atividades lúdicas e ensino bíblico seguro durante o culto de celebração de domingo.",
  },
  {
    id: "estacionamento",
    question: "A igreja possui estacionamento ou local para parar?",
    answer: "A R. Treze é calma e residencial, permitindo estacionamento tranquilo e seguro em frente e nas proximidades do templo.",
  },
  {
    id: "visita",
    question: "Preciso ser membro ou avisar antes para participar?",
    answer: "Absolutamente não! Nossas portas estão sempre abertas para receber você e sua família. Sinta-se em casa.",
  },
];
