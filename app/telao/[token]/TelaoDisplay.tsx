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
    <div className="flex-1 flex flex-col h-full w-full justify-between p-6 lg:p-8 select-none relative overflow-hidden bg-gradient-to-b from-white via-gelo-light to-gelo/30">
      {/* Padrão decorativo sutil de fundo do site */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/images/patterns/pattern-10.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
      />

      {/* Cabeçalho superior luminoso e arejado com a identidade visual da IBBE */}
      <header className="relative z-10 flex items-center justify-between border-b border-marinho/10 pb-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-cobalto/10 border border-cobalto/20 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-verde animate-pulse shadow-sm shadow-verde/40" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight text-marinho flex items-center gap-2">
                <span>Igreja Batista Bethel</span>
                <span className="text-marinho/25 font-light">•</span>
                <span className="text-cobalto font-bold">Momento de Intercessão</span>
              </h1>
            </div>
            <p className="text-xs text-marinho/65 font-medium">
              Pedidos de oração recebidos durante esta semana (segunda a domingo)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {prayers.length > 0 && (
            <div className="bg-white/90 border border-marinho/10 px-4 py-1.5 rounded-full text-xs font-semibold text-marinho shadow-elevation-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cobalto" />
              <span>{prayers.length} {prayers.length === 1 ? "pedido da semana" : "pedidos da semana"}</span>
            </div>
          )}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full bg-white hover:bg-gelo-light border border-marinho/10 text-marinho/70 hover:text-marinho transition-all shadow-sm"
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
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-marinho/60">
            <div className="w-10 h-10 border-3 border-cobalto/25 border-t-cobalto rounded-full animate-spin" />
            <p className="text-base font-medium">Buscando motivos de oração...</p>
          </div>
        ) : error && prayers.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center max-w-md mx-auto">
            <p className="text-red-700 text-base bg-red-50 border border-red-200 px-6 py-3 rounded-2xl shadow-sm">
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
          /* Estado Vazio - Slide Congregacional Luminoso e Acolhedor */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 lg:p-12 bg-white border border-marinho/10 rounded-3xl my-auto shadow-elevation-1">
            <div className="w-20 h-20 mb-6 rounded-full bg-gelo border border-cobalto/20 flex items-center justify-center text-cobalto shadow-inner">
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
            
            <h2 className="text-3xl lg:text-4xl font-extrabold text-marinho mb-4 tracking-tight">
              Uma igreja feita de{" "}
              <span className="font-script-accent text-cobalto italic inline-block text-[1.15em] -rotate-1">
                oração.
              </span>
            </h2>
            
            <p className="text-lg lg:text-xl text-marinho/80 font-normal max-w-2xl mb-4 leading-relaxed">
              &ldquo;Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.&rdquo;
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gelo/70 border border-marinho/10 text-marinho/80 text-xs font-semibold uppercase tracking-wider mb-8">
              <span>Filipenses 4:6</span>
              <span className="text-marinho/30">•</span>
              <span>Igreja Batista Bethel em Resende</span>
            </div>

            <button
              onClick={() => fetchPrayers()}
              className="px-6 py-2.5 rounded-full bg-gelo hover:bg-gelo/80 border border-marinho/10 text-marinho text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Verificar Novos Pedidos
            </button>
          </div>
        ) : (
          /* Grade 4 colunas x 2 linhas para acomodar 8 pedidos com proporção vertical estável */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-3.5 lg:gap-4 flex-1 h-full min-h-0 py-1">
            {currentBatch.map((prayer) => {
              const displayName =
                prayer.is_anonymous || !prayer.name
                  ? "Irmão(ã) em Cristo"
                  : prayer.name;

              return (
                <article
                  key={prayer.id}
                  className="bg-white hover:bg-gelo-light/50 border border-marinho/10 hover:border-cobalto/25 rounded-2xl p-4 lg:p-5 flex flex-col justify-start shadow-elevation-1 transition-all relative overflow-hidden group"
                >
                  {/* Linha de acento de marca no topo do cartão */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cobalto via-ceu to-cobalto opacity-70 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-2.5 overflow-hidden flex-1 flex flex-col justify-start">
                    <div className="flex items-center justify-between border-b border-marinho/10 pb-2">
                      <span className="text-cobalto font-bold text-base lg:text-lg tracking-tight truncate max-w-[78%]">
                        {displayName}
                      </span>
                      <span className="text-micro font-semibold text-marinho/60 uppercase tracking-widest bg-gelo/60 px-2.5 py-0.5 rounded-full border border-marinho/10 shrink-0">
                        Oração
                      </span>
                    </div>
                    <p className="text-marinho text-sm lg:text-[15px] xl:text-base font-normal leading-relaxed pt-0.5 select-text">
                      {prayer.request}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Rodapé Operacional com Controle Manual Luminoso */}
      <footer className="relative z-10 flex items-center justify-between pt-4 mt-3 border-t border-marinho/10 text-xs text-marinho/70">
        <div className="flex items-center gap-2">
          <kbd className="px-2.5 py-1 rounded-md bg-white border border-marinho/15 text-marinho font-mono text-micro shadow-sm">
            Espaço
          </kbd>
          <span>ou</span>
          <kbd className="px-2.5 py-1 rounded-md bg-white border border-marinho/15 text-marinho font-mono text-micro shadow-sm">
            →
          </kbd>
          <span className="text-marinho/70 font-medium">para avançar lote (até 8 pedidos)</span>
        </div>

        {prayers.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdvanceBatch}
              disabled={isAdvancing}
              className="px-6 py-2.5 rounded-full bg-cobalto hover:bg-cobalto/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-elevation-1 hover:shadow-elevation-2 disabled:opacity-50 flex items-center gap-2"
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
