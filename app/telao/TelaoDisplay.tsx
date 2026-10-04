"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { getTelaoPrayerRequests, markPrayerRequestsAsDisplayed } from "./actions";

interface PrayerRequest {
  id: string;
  name: string | null;
  request: string;
  is_anonymous: boolean;
  created_at?: string;
}

interface TelaoDisplayProps {
  token?: string;
}

export default function TelaoDisplay({ token }: TelaoDisplayProps) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const [batchKey, setBatchKey] = useState(0);

  const fetchPrayers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (token) {
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
      } else {
        const data = await getTelaoPrayerRequests();
        setPrayers(Array.isArray(data) ? data : []);
      }

      setBatchKey((prev) => prev + 1);
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

  // Avançar lote atual (até 12 pedidos) com transição orquestrada
  const handleAdvanceBatch = useCallback(async () => {
    if (isAdvancing || prayers.length === 0) return;

    try {
      setIsAdvancing(true);
      const currentBatch = prayers.slice(0, 12);
      const currentBatchIds = currentBatch.map((p) => p.id);

      // Dispara marcação de displayed em paralelo para o lote atual
      if (token) {
        await Promise.allSettled(
          currentBatchIds.map((id) =>
            fetch(`/api/prayer-requests/${id}/displayed`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );
      } else {
        await markPrayerRequestsAsDisplayed(currentBatchIds);
      }

      // Remove os pedidos exibidos do estado local e incrementa a chave do lote
      const remainingPrayers = prayers.slice(12);
      setPrayers(remainingPrayers);
      setBatchKey((prev) => prev + 1);

      // Se restarem menos de 12, busca novos pedidos aprovados
      if (remainingPrayers.length < 12) {
        if (token) {
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
        } else {
          const freshData = await getTelaoPrayerRequests();
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

  const currentBatch = prayers.slice(0, 12);

  return (
    <div className="flex-1 flex flex-col h-full w-full justify-between p-4 sm:p-5 lg:p-6 select-none relative overflow-hidden bg-gradient-to-b from-white via-gelo-light to-gelo/30">
      {/* Padrão decorativo sutil de fundo do site */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('/images/patterns/pattern-10.png')", backgroundSize: '400px', backgroundRepeat: 'repeat' }}
      />

      {/* Cabeçalho minimalista: Logo da Igreja + Momento de Intercessão à esquerda | Botão de Tela Cheia à direita */}
      <header className="relative z-10 flex items-center justify-between border-b border-marinho/10 pb-2.5 mb-3">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Igreja Batista Bethel"
              width={160}
              height={44}
              className="object-contain w-auto h-9 sm:h-11"
              priority
            />
          </div>
          <div className="h-6 w-px bg-marinho/15 hidden sm:block" />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-marinho flex items-baseline gap-1.5">
            <span>Momento de</span>
            <span className="font-script text-cobalto italic font-normal text-[1.25em] inline-block -rotate-1">
              Intercessão
            </span>
          </h1>
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-full bg-white hover:bg-gelo-light border border-marinho/10 text-marinho/70 hover:text-marinho transition-all shadow-sm focus:outline-none"
          title="Alternar Tela Cheia (F11)"
          aria-label="Alternar Tela Cheia"
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
      </header>

      {/* Área Principal de Conteúdo com Transição Cinematográfica Overdrive */}
      <section className="relative z-10 flex-1 flex flex-col justify-center min-h-0 pb-2 overflow-hidden">
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8 lg:p-12 bg-white border border-marinho/10 rounded-3xl my-auto shadow-elevation-1"
          >
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
              <span className="font-script text-cobalto italic inline-block text-[1.15em] -rotate-1">
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
          </motion.div>
        ) : (
          /* Grade 4 colunas x 3 linhas (12 pedidos) com Transição Cinematográfica entre Lotes (Overdrive) */
          <AnimatePresence mode="wait">
            <motion.div
              key={`batch-${batchKey}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.035,
                    delayChildren: 0.02,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: {
                    staggerChildren: 0.02,
                    staggerDirection: -1,
                    duration: 0.2,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-3 gap-2.5 lg:gap-3 flex-1 h-full min-h-0 py-0.5"
            >
              {currentBatch.map((prayer, index) => {
                const displayName =
                  prayer.is_anonymous || !prayer.name
                    ? "Irmão(ã) em Cristo"
                    : prayer.name;

                return (
                  <motion.article
                    key={prayer.id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 16,
                        scale: 0.97,
                        filter: "blur(4px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        transition: {
                          type: "spring",
                          damping: 24,
                          stiffness: 280,
                          mass: 0.8,
                        },
                      },
                      exit: {
                        opacity: 0,
                        y: -10,
                        scale: 0.98,
                        filter: "blur(3px)",
                        transition: {
                          duration: 0.18,
                          ease: "easeIn",
                        },
                      },
                    }}
                    className="bg-white hover:bg-gelo-light/50 border border-marinho/10 hover:border-cobalto/25 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 lg:p-4 flex flex-col justify-start shadow-elevation-1 transition-colors relative overflow-hidden group"
                  >
                    {/* Linha de acento de marca com suave pulso de entrada */}
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.06 + index * 0.025, duration: 0.45, ease: "easeOut" }}
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cobalto via-ceu to-cobalto origin-left opacity-75 group-hover:opacity-100 transition-opacity" 
                    />
                    
                    <div className="space-y-1.5 sm:space-y-2 overflow-hidden flex-1 flex flex-col justify-start">
                      <div className="flex items-center justify-between border-b border-marinho/10 pb-1.5">
                        <span className="text-marinho font-bold text-sm sm:text-base tracking-tight truncate max-w-[76%]">
                          {displayName}
                        </span>
                        <span className="text-micro font-semibold text-cobalto uppercase tracking-wider bg-gelo/70 px-2 py-0.5 rounded-full border border-cobalto/15 shrink-0">
                          Oração
                        </span>
                      </div>
                      <p className="text-marinho/90 text-sm sm:text-base font-medium leading-relaxed pt-0.5 select-text">
                        &ldquo;{prayer.request}&rdquo;
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
}
