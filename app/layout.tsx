import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat } from "next/font/google";
import "./globals.css";

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
  title: "Igreja Batista Bethel em Resende | IBBE",
  description: "Uma igreja feita de pessoas. Aqui ninguém caminha só.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${caveat.variable}`}>
      <body className="bg-white text-marinho font-sans antialiased selection:bg-gelo selection:text-marinho">
        {children}
      </body>
    </html>
  );
}
