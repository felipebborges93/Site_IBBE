import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Toaster } from "@/components/ui/Toast";
import { ModerationDashboard, PrayerRequestItem } from "./ModerationDashboard";

export const dynamic = "force-dynamic";

export default async function AdminOracaoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // D-01: Fila ordenada em FIFO (mais antigos primeiro: ascending: true)
  const { data: requests, error } = await supabase
    .from("prayer_requests")
    .select("id, name, request, status, is_anonymous, allow_public_display, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Erro ao carregar pedidos de oração</h2>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <Toaster />

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-marinho">Moderação Pastoral</h1>
          <p className="text-sm text-marinho/60 mt-1">
            Gerenciamento e aprovação de pedidos de oração da congregação
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/telao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalto text-white text-xs font-semibold hover:bg-cobalto/90 transition-colors shadow-sm"
          >
            <span>Abrir Telão</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <span className="text-xs text-marinho/50 hidden sm:inline">
            Conectado como {user.email}
          </span>
          <form
            action={async () => {
              "use server";
              const supabase = await createClient();
              await supabase.auth.signOut();
              redirect("/login");
            }}
          >
            <Button variant="ghost" type="submit" size="sm" className="border border-marinho/15">
              Sair
            </Button>
          </form>
        </div>
      </div>

      {/* Painel com Abas, FIFO, Ações e Toasts */}
      <ModerationDashboard requests={(requests as PrayerRequestItem[]) || []} />
    </div>
  );
}
