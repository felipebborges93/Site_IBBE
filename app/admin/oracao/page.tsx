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
    .select("id, name, request, status, is_anonymous, created_at")
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
