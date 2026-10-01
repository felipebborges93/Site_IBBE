"use client";

import React, { useEffect, useState } from "react";
import { clsx } from "clsx";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

type ToastListener = (toast: ToastMessage) => void;

const listeners: Set<ToastListener> = new Set();

export const toast = {
  success: (message: string) => {
    emit({ id: Math.random().toString(36).substring(2, 9), type: "success", message });
  },
  error: (message: string) => {
    emit({ id: Math.random().toString(36).substring(2, 9), type: "error", message });
  },
  info: (message: string) => {
    emit({ id: Math.random().toString(36).substring(2, 9), type: "info", message });
  },
};

function emit(toastMsg: ToastMessage) {
  listeners.forEach((listener) => listener(toastMsg));
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleNewToast: ToastListener = (newToast) => {
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4000);
    };

    listeners.add(handleNewToast);
    return () => {
      listeners.delete(handleNewToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => {
        const isSuccess = t.type === "success";
        const isError = t.type === "error";

        return (
          <div
            key={t.id}
            className={clsx(
              "pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl shadow-lg border transition-all duration-200 animate-in fade-in slide-in-from-bottom-5",
              isSuccess && "bg-white border-verde/30 text-marinho shadow-verde/10",
              isError && "bg-white border-red-300 text-marinho shadow-red-100",
              !isSuccess && !isError && "bg-white border-marinho/15 text-marinho shadow-sm"
            )}
          >
            <div className="flex items-center gap-3">
              {isSuccess && (
                <div className="w-6 h-6 rounded-full bg-verde/15 flex items-center justify-center text-verde flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {isError && (
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <p className="text-sm font-medium">{t.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-marinho/40 hover:text-marinho p-1 -mr-1 -mt-1 rounded-md transition-colors"
              aria-label="Fechar notificação"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
