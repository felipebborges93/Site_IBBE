"use client";

import React, { useState, useEffect, useCallback } from "react";

interface PrayerRequest {
  id: string;
  name: string | null;
  request: string;
  is_anonymous: boolean;
  created_at?: string;
}

interface TelaoDisplayProps {
  token: string;
}

export default function TelaoDisplay({ token }: TelaoDisplayProps) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const fetchPrayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/prayer-requests/display", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Falha ao carregar pedidos (${res.status})`);
      }

      const data = await res.json();
      setPrayers(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro desconhecido ao carregar";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  // Avançar lote atual (até 4 pedidos)
  const handleAdvanceBatch = useCallback(async () => {
    if (isAdvancing || prayers.length === 0) return;

    try {
      setIsAdvancing(true);
      const currentBatch = prayers.slice(0, 4);

      // Dispara marcação de displayed em paralelo para o lote atual
      await Promise.allSettled(
        currentBatch.map((prayer) =>
          fetch(`/api/prayer-requests/${prayer.id}/displayed`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      // Remove os pedidos exibidos do estado local
      const remainingPrayers = prayers.slice(4);
      setPrayers(remainingPrayers);

      // Se restarem menos de 4, busca novos pedidos aprovados
      if (remainingPrayers.length < 4) {
        const res = await fetch("/api/prayer-requests/display", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const freshData = await res.json();
          if (Array.isArray(freshData)) {
            setPrayers(freshData);
          }
        }
      }
    } catch (err) {
      console.error("Erro ao avançar lote de orações:", err);
    } finally {
      setIsAdvancing(false);
    }
  }, [isAdvancing, prayers, token]);

  // Atalhos de teclado (Espaço ou Seta Direita para avançar lote)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowRight") {
        e.preventDefault();
        handleAdvanceBatch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAdvanceBatch]);

  // Alternar tela cheia nativa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const currentBatch = prayers.slice(0, 4);

  return (
    <div className="flex-1 flex flex-col h-full w-full justify-between p-6 lg:p-10 select-none">
      {/* Cabeçalho superior discreto */}
      <header className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Igreja Batista Bethel</span>
            <span className="text-slate-500 font-normal">&bull;</span>
            <span className="text-amber-400 font-semibold">
              Momento de Oração Congregacional
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          {prayers.length > 0 && (
            <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-mono">
              Fila: {prayers.length} {prayers.length === 1 ? "pedido" : "pedidos"}
            </span>
          )}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Alternar Tela Cheia (F11)"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Área Principal de Conteúdo */}
      <section className="flex-1 flex flex-col justify-center">
        {loading && prayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-20 text-slate-400">
            <div className="w-10 h-10 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
            <p className="text-lg">Carregando pedidos de oração...</p>
          </div>
        ) : error && prayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-20 text-center">
            <p className="text-red-400 text-lg">Erro ao carregar dados: {error}</p>
            <button
              onClick={() => fetchPrayers()}
              className="px-6 py-2 bg-slate-900 border border-slate-800 text-white rounded-xl hover:bg-slate-800 transition"
            >
              Tentar Novamente
            </button>
          </div>
        ) : prayers.length === 0 ? (
          /* Estado Vazio - Slide Congregacional Acolhedor */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-900/40 border border-slate-850 rounded-3xl my-auto">
            <div className="w-20 h-20 mb-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Momento de Oração Congregacional
            </h2>
            <p className="text-xl lg:text-2xl text-amber-400 font-serif italic max-w-3xl mb-4 leading-relaxed">
              &ldquo;Não andem ansiosos por coisa alguma, mas em tudo, pela oração e
              súplicas, e com ação de graças, apresentem seus pedidos a Deus.&rdquo;
            </p>
            <p className="text-slate-400 text-base lg:text-lg font-mono">
              Filipenses 4:6 &bull; Igreja Batista Bethel em Resende
            </p>
            <button
              onClick={() => fetchPrayers()}
              className="mt-8 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium transition"
            >
              Verificar Novos Pedidos
            </button>
          </div>
        ) : (
          /* Grade 2x2 de Pedidos Estáticos */
          <div className="grid grid-cols-2 grid-rows-2 gap-6 lg:gap-8 flex-1 h-full min-h-[500px]">
            {currentBatch.map((prayer) => {
              const displayName =
                prayer.is_anonymous || !prayer.name
                  ? "Anônimo"
                  : prayer.name;

              return (
                <article
                  key={prayer.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span className="text-amber-400 font-semibold text-2xl lg:text-3xl tracking-wide flex items-center gap-2">
                        {displayName}
                      </span>
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                        Oração
                      </span>
                    </div>
                    <p className="text-2xl lg:text-3xl text-slate-100 font-normal leading-relaxed line-clamp-6 pt-1">
                      {prayer.request}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Rodapé Operacional com Controle Manual */}
      <footer className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800/80 text-sm text-slate-500">
        <div className="flex items-center gap-2 text-xs lg:text-sm">
          <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs">
            Espaço
          </kbd>
          <span>ou</span>
          <kbd className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs">
            &rarr;
          </kbd>
          <span className="text-slate-400">para avançar lote</span>
        </div>

        {prayers.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleAdvanceBatch}
              disabled={isAdvancing}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isAdvancing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Avançando...</span>
                </>
              ) : (
                <>
                  <span>Marcar como Exibidos e Avançar</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
