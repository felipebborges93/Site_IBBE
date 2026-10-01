"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toast";
import {
  approvePrayerRequest,
  rejectPrayerRequest,
  undoModeration,
} from "@/app/actions/moderation";
import { ModerationStatus } from "@/lib/validations/moderation";

export interface PrayerRequestItem {
  id: string;
  name: string;
  request: string;
  status: ModerationStatus;
  is_anonymous: boolean;
  allow_public_display?: boolean;
  created_at: string;
}

interface ModerationDashboardProps {
  requests: PrayerRequestItem[];
}

export function ModerationDashboard({ requests }: ModerationDashboardProps) {
  const [activeTab, setActiveTab] = useState<ModerationStatus>("pending");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Contadores
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const approvedRequests = requests.filter((r) => r.status === "approved");
  const rejectedRequests = requests.filter((r) => r.status === "rejected");

  const counts: Record<ModerationStatus, number> = {
    pending: pendingRequests.length,
    approved: approvedRequests.length,
    rejected: rejectedRequests.length,
  };

  // Itens da aba ativa
  // D-01: Pendentes vêm ordenados em FIFO pelo servidor, mas garantimos aqui também.
  const currentList = requests
    .filter((r) => r.status === activeTab)
    .sort((a, b) => {
      if (activeTab === "pending") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const handleAction = (
    id: string,
    action: "approve" | "reject" | "undo"
  ) => {
    setPendingId(id);
    startTransition(async () => {
      try {
        let result;
        if (action === "approve") {
          result = await approvePrayerRequest(id);
        } else if (action === "reject") {
          result = await rejectPrayerRequest(id);
        } else {
          result = await undoModeration(id);
        }

        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message || "Erro ao processar a moderação.");
        }
      } catch (err: unknown) {
        toast.error("Erro inesperado na comunicação com o servidor.");
      } finally {
        setPendingId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Abas e Contadores (D-03) */}
      <div className="flex border-b border-marinho/15 gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("pending")}
          className={`pb-3 px-2 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "pending"
              ? "border-cobalto text-cobalto"
              : "border-transparent text-marinho/60 hover:text-marinho"
          }`}
        >
          Pendentes
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === "pending"
                ? "bg-cobalto/10 text-cobalto font-bold"
                : "bg-marinho/10 text-marinho/70"
            }`}
          >
            {counts.pending}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("approved")}
          className={`pb-3 px-2 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "approved"
              ? "border-verde text-verde"
              : "border-transparent text-marinho/60 hover:text-marinho"
          }`}
        >
          Aprovados
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === "approved"
                ? "bg-verde/15 text-verde font-bold"
                : "bg-marinho/10 text-marinho/70"
            }`}
          >
            {counts.approved}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rejected")}
          className={`pb-3 px-2 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === "rejected"
              ? "border-red-600 text-red-600"
              : "border-transparent text-marinho/60 hover:text-marinho"
          }`}
        >
          Rejeitados
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === "rejected"
                ? "bg-red-100 text-red-700 font-bold"
                : "bg-marinho/10 text-marinho/70"
            }`}
          >
            {counts.rejected}
          </span>
        </button>
      </div>

      {/* Conteúdo da Tabela / Lista */}
      <div className="bg-white rounded-xl shadow-sm border border-marinho/15 overflow-x-auto">
        <table className="w-full text-left text-sm text-marinho/70">
          <caption className="sr-only">
            Fila de moderação de pedidos de oração - aba {activeTab}
          </caption>
          <thead className="bg-gelo-light text-marinho uppercase">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                {activeTab === "pending" ? "Recebido em (FIFO)" : "Data"}
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Nome
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Pedido
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-right">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-marinho/10">
            {currentList.map((req) => {
              const itemLoading = isPending && pendingId === req.id;
              const formattedDate = new Date(req.created_at).toLocaleDateString(
                "pt-BR",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <tr key={req.id} className="hover:bg-gelo-light/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-marinho/60">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-4 font-medium text-marinho">
                    {req.is_anonymous ? (
                      <span className="text-marinho/40 italic">Anônimo</span>
                    ) : (
                      <div className="flex flex-col">
                        <span>{req.name}</span>
                        {req.allow_public_display ? (
                          <span className="text-micro font-semibold text-verde mt-0.5">
                            ✓ Telão Autorizado
                          </span>
                        ) : (
                          <span className="text-micro text-marinho/45 mt-0.5">
                            Apenas Intercessão
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-sm">
                    <p className="line-clamp-2 text-marinho/80" title={req.request}>
                      {req.request}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        req.status === "approved"
                          ? "bg-verde/15 text-verde"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-ceu/30 text-cobalto"
                      }`}
                    >
                      {req.status === "pending"
                        ? "Pendente"
                        : req.status === "approved"
                        ? "Aprovado"
                        : "Rejeitado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    {req.status === "pending" ? (
                      <>
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          disabled={itemLoading}
                          onClick={() => handleAction(req.id, "approve")}
                          aria-label={`Aprovar pedido de ${
                            req.is_anonymous ? "Anônimo" : req.name
                          }`}
                          className="bg-verde hover:bg-verde/90 min-h-[44px]"
                        >
                          {itemLoading ? "Salvando..." : "Aprovar"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={itemLoading}
                          onClick={() => handleAction(req.id, "reject")}
                          aria-label={`Rejeitar pedido de ${
                            req.is_anonymous ? "Anônimo" : req.name
                          }`}
                          className="text-red-600 border border-red-200 hover:bg-red-50 min-h-[44px]"
                        >
                          {itemLoading ? "Salvando..." : "Rejeitar"}
                        </Button>
                      </>
                    ) : (
                      /* MOD-03 & D-03: Botão Desfazer disponível nas abas Aprovados e Rejeitados */
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={itemLoading}
                        onClick={() => handleAction(req.id, "undo")}
                        aria-label={`Desfazer moderação do pedido de ${
                          req.is_anonymous ? "Anônimo" : req.name
                        }`}
                        className="text-cobalto border border-cobalto/20 hover:bg-cobalto/5 min-h-[44px]"
                      >
                        {itemLoading ? "Revertendo..." : "Desfazer"}
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}

            {currentList.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-marinho/60 space-y-2"
                >
                  <p className="font-medium">
                    {activeTab === "pending"
                      ? "Nenhum pedido pendente de moderação."
                      : activeTab === "approved"
                      ? "Nenhum pedido aprovado no histórico."
                      : "Nenhum pedido rejeitado no histórico."}
                  </p>
                  <p className="text-xs text-marinho/40">
                    {activeTab === "pending"
                      ? "Novos pedidos enviados pela congregação aparecerão aqui automaticamente."
                      : "Modere pedidos na aba Pendentes para preencher esta lista."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
