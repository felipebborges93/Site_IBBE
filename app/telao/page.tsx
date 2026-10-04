import TelaoDisplay from "./TelaoDisplay";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Telão de Oração | Igreja Batista Bethel em Resende",
  description: "Projeção de motivos e pedidos de oração da congregação.",
};

export default function TelaoIndexPage() {
  return (
    <main className="min-h-screen h-screen w-screen overflow-hidden bg-[#F8FAFC] text-marinho select-none flex flex-col font-sans">
      <TelaoDisplay />
    </main>
  );
}
