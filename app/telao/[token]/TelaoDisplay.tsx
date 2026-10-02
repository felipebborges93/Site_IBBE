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

  // Avançar lote atual (até 8 pedidos)
  const handleAdvanceBatch = useCallback(async () => {
    if (isAdvancing || prayers.length === 0) return;

    try {
      setIsAdvancing(true);
      const currentBatch = prayers.slice(0, 8);

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
      const remainingPrayers = prayers.slice(8);
      setPrayers(remainingPrayers);

      // Se restarem menos de 8, busca novos pedidos aprovados
      if (remainingPrayers.length < 8) {
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

  const currentBatch = prayers.slice(0, 8);

  return (
    <div className="flex-1 flex flex-col h-full w-full justify-between p-6 lg:p-8 select-none relative overflow-hidden">
      {/* Padrão decorativo sutil de fundo alinhado ao site */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{ backgroundImage: "url('/images/patterns/pattern-9.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
      />

      {/* Cabeçalho superior refinado com a identidade visual da IBBE */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cobalto/20 border border-cobalto/30 shadow-inner">
            <span className="w-3 h-3 rounded-full bg-verde animate-pulse shadow-sm shadow-verde/50" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Igreja Batista Bethel</span>
                <span className="text-white/30 font-light">•</span>
                <span className="text-ceu font-bold">Momento de Intercessão</span>
              </h1>
            </div>
            <p className="text-xs text-white/60 font-medium">
              Apresentando as orações e súplicas da nossa família ao Senhor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {prayers.length > 0 && (
            <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold text-white/90 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ceu" />
              <span>{prayers.length} {prayers.length === 1 ? "pedido na fila" : "pedidos na fila"}</span>
            </div>
          )}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all shadow-sm"
            title="Alternar Tela Cheia (F11)"
          >
            <svg
              className="w-4 h-4"
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
      <section className="relative z-10 flex-1 flex flex-col justify-center min-h-0">
        {loading && prayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-white/70">
            <div className="w-10 h-10 border-3 border-cobalto/20 border-t-cobalto rounded-full animate-spin" />
            <p className="text-base font-medium">Buscando motivos de oração...</p>
          </div>
        ) : error && prayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center max-w-md mx-auto">
            <p className="text-red-300 text-base bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl">
              Erro ao carregar dados: {error}
            </p>
            <button
              onClick={() => fetchPrayers()}
              className="px-6 py-2.5 bg-cobalto hover:bg-cobalto/90 text-white font-semibold rounded-full shadow-elevation-1 transition-all text-sm"
            >
              Tentar Novamente
            </button>
          </div>
        ) : prayers.length === 0 ? (
          /* Estado Vazio - Slide Congregacional Acolhedor com estética do site */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 lg:p-12 bg-white/[0.04] border border-white/10 rounded-3xl my-auto shadow-elevation-2 backdrop-blur-md">
            <div className="w-20 h-20 mb-6 rounded-full bg-cobalto/15 border border-cobalto/30 flex items-center justify-center text-ceu shadow-inner">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Uma igreja feita de{" "}
              <span className="font-script-accent text-ceu italic inline-block text-[1.15em] -rotate-1">
                oração.
              </span>
            </h2>
            
            <p className="text-lg lg:text-xl text-white/90 font-normal max-w-2xl mb-4 leading-relaxed">
              &ldquo;Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.&rdquo;
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-ceu text-xs font-semibold uppercase tracking-wider mb-8">
              <span>Filipenses 4:6</span>
              <span className="text-white/30">•</span>
              <span>Igreja Batista Bethel em Resende</span>
            </div>

            <button
              onClick={() => fetchPrayers()}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Verificar Novos Pedidos
            </button>
          </div>
        ) : (
          /* Grade 4 colunas x 2 linhas para acomodar 8 pedidos com elegância e alta legibilidade */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 flex-1 h-full min-h-0 py-1">
            {currentBatch.map((prayer) => {
              const displayName =
                prayer.is_anonymous || !prayer.name
                  ? "Irmão(ã) em Cristo"
                  : prayer.name;

              return (
                <article
                  key={prayer.id}
                  className="bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-elevation-1 backdrop-blur-sm transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cobalto via-ceu to-cobalto opacity-70 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-2.5 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-ceu font-bold text-lg lg:text-xl tracking-tight truncate max-w-[80%]">
                        {displayName}
                      </span>
                      <span className="text-micro font-semibold text-white/50 uppercase tracking-widest bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        Oração
                      </span>
                    </div>
                    <p className="text-white/95 text-base lg:text-lg font-normal leading-snug line-clamp-4 pt-0.5">
                      {prayer.request}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-micro text-white/40">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ceu/60" />
                      Intercessão
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Rodapé Operacional com Controle Manual Alinhado à Linguagem IBBE */}
      <footer className="relative z-10 flex items-center justify-between pt-4 mt-3 border-t border-white/10 text-xs text-white/60">
        <div className="flex items-center gap-2">
          <kbd className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white font-mono text-micro shadow-sm">
            Espaço
          </kbd>
          <span>ou</span>
          <kbd className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white font-mono text-micro shadow-sm">
            →
          </kbd>
          <span className="text-white/70">para avançar lote (até 8 pedidos)</span>
        </div>

        {prayers.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdvanceBatch}
              disabled={isAdvancing}
              className="px-6 py-2.5 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-elevation-2 hover:shadow-elevation-3 disabled:opacity-50 flex items-center gap-2"
            >
              {isAdvancing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Avançando lote...</span>
                </>
              ) : (
                <>
                  <span>Marcar como Exibidos e Avançar</span>
                  <svg
                    className="w-4 h-4"
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
