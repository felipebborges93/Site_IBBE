export interface SiteConfig {
  name: string;
  shortName: string;
  nickname: string;
  slogans: {
    primary: string;
    secondary: string;
  };
  foundationDate: string;
  location: {
    address: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    googleMapsUrl: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    pixKey: string;
  };
  social: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Igreja Batista Bethel em Resende",
  shortName: "IBBE",
  nickname: "Igrejinha do cantão",
  slogans: {
    primary: "Uma igreja feita de pessoas.",
    secondary: "Aqui ninguém caminha só.",
  },
  foundationDate: "28/10/2000",
  location: {
    address: "Rua das Acácias, 120",
    neighborhood: "Vila Isabel",
    city: "Resende",
    state: "RJ",
    cep: "27511-000",
    googleMapsUrl: "https://maps.google.com/?q=Rua+das+Acacias+120+Vila+Isabel+Resende+RJ",
  },
  contact: {
    phone: "[PLACEHOLDER: Telefone de atendimento institucional]",
    whatsapp: "[PLACEHOLDER: WhatsApp de atendimento]",
    email: "[PLACEHOLDER: E-mail de contato]",
    pixKey: "[PLACEHOLDER: Chave PIX da igreja]",
  },
  social: {
    instagram: "https://instagram.com/ibberesende",
    youtube: "https://youtube.com/@ibberesende",
    facebook: "https://facebook.com/ibberesende",
  },
};
