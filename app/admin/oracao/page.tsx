import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Button from "@/components/ui/Button";

export default async function AdminOracaoPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: requests, error } = await supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Erro ao carregar pedidos: {error.message}</div>;
  }

  async function updateStatus(id: string, status: string) {
    "use server";
    const supabase = createClient();
    await supabase.from("prayer_requests").update({ status }).eq("id", id);
    revalidatePath("/admin/oracao");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Moderação de Pedidos de Oração</h1>
        <form action={async () => {
          "use server";
          const supabase = createClient();
          await supabase.auth.signOut();
          redirect("/login");
        }}>
          <Button variant="outline" type="submit">Sair</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-600">
          <thead className="bg-neutral-50 text-neutral-700 uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Data</th>
              <th className="px-6 py-4 font-semibold">Nome</th>
              <th className="px-6 py-4 font-semibold">Pedido</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {requests?.map((req) => (
              <tr key={req.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(req.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {req.is_anonymous ? <span className="text-neutral-400 italic">Anônimo</span> : req.name}
                </td>
                <td className="px-6 py-4 max-w-xs truncate" title={req.request}>
                  {req.request}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.status === 'approved' ? 'bg-green-100 text-green-800' :
                    req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {req.status === 'pending' ? 'Pendente' : req.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {req.status === 'pending' && (
                    <>
                      <form action={updateStatus.bind(null, req.id, 'approved')} className="inline-block">
                        <Button type="submit" variant="primary" size="sm" className="bg-green-600 hover:bg-green-700">Aprovar</Button>
                      </form>
                      <form action={updateStatus.bind(null, req.id, 'rejected')} className="inline-block">
                        <Button type="submit" variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Rejeitar</Button>
                      </form>
                    </>
                  )}
                  {req.status !== 'pending' && (
                    <form action={updateStatus.bind(null, req.id, 'pending')} className="inline-block">
                      <Button type="submit" variant="outline" size="sm">Desfazer</Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
            {requests?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                  Nenhum pedido de oração encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
