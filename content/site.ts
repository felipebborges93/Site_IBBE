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
    address: "R. Treze",
    neighborhood: "Vila Izabel",
    city: "Resende",
    state: "RJ",
    cep: "27525-544",
    googleMapsUrl: "https://maps.google.com/?q=R.+Treze,+Vila+Izabel,+Resende+-+RJ,+27525-544",
  },
  contact: {
    phone: "(24) 99203-7665",
    whatsapp: "5524992037665",
    email: "ibbecomunicacao@gmail.com",
    pixKey: "04.198.205/0001-84",
  },
  social: {
    instagram: "https://instagram.com/ibberesende",
    youtube: "https://www.youtube.com/@IgrejaBatistaBethelemResende",
    facebook: "https://facebook.com/ibberesende",
  },
};
