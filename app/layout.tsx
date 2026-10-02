import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SpeedInsights } from "@vercel/speed-insights/next";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bethelresende.com.br"),
  title: {
    default: "Igreja Batista Bethel em Resende | IBBE",
    template: "%s | IBBE Resende",
  },
  description:
    "Uma igreja feita de pessoas. Aqui ninguém caminha só. Conheça a Igreja Batista Bethel em Resende/RJ: cultos, pequenos grupos (PGMs), pedidos de oração e comunidade acolhedora.",
  keywords: [
    "Igreja Batista",
    "IBBE Resende",
    "Igreja em Resende",
    "Batista Bethel",
    "Cultos em Resende",
    "PGM Resende",
    "Pedidos de Oração",
    "Igreja Batista Bethel",
  ],
  authors: [{ name: "Igreja Batista Bethel em Resende" }],
  creator: "IBBE Resende",
  publisher: "IBBE Resende",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bethelresende.com.br",
    title: "Igreja Batista Bethel em Resende | IBBE",
    description:
      "Uma igreja feita de pessoas. Aqui ninguém caminha só. Cultos, comunidade e acolhimento em Resende/RJ.",
    siteName: "Igreja Batista Bethel em Resende",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Igreja Batista Bethel em Resende - Uma igreja feita de pessoas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Igreja Batista Bethel em Resende | IBBE",
    description: "Uma igreja feita de pessoas. Aqui ninguém caminha só.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const churchJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: "https://bethelresende.com.br",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      postalCode: siteConfig.location.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.4689,
      longitude: -44.4532,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "08:30",
        closes: "10:00",
        description: "Culto da Manhã",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "11:00",
        description: "Escola Bíblica Dominical (EBD)",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "18:00",
        closes: "20:00",
        description: "Culto da Noite",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday"],
        opens: "19:30",
        closes: "21:00",
        description: "Bethel Kids",
      },
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.facebook,
    ],
  };

  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${caveat.variable} scroll-smooth`}>
      <body className="bg-white text-marinho font-sans antialiased selection:bg-gelo selection:text-marinho flex flex-col min-h-screen">
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3 focus:bg-cobalto focus:text-branco focus:rounded-lg focus:shadow-lg focus:font-medium focus:outline-none"
          >
            Saltar para o conteúdo principal
          </a>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
          />
          <SiteChrome>
            {children}
          </SiteChrome>
        </SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
