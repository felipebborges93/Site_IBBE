"use client";

import React, { useState, useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { submitPrayerRequest, type PrayerActionState } from "@/app/actions/prayer";
import { Button } from "@/components/ui/Button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Enviando..." : "Enviar Pedido"}
    </Button>
  );
}

export default function PrayerForm() {
  const [state, formAction] = useActionState<PrayerActionState | null, FormData>(
    submitPrayerRequest,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [requestText, setRequestText] = useState("");

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setRequestText("");
      setIsAnonymous(false);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-marinho/10"
    >
      {state?.message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            state.success
              ? "bg-verde-50 border border-verde-200 text-verde-800"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {state.success ? (
            <CheckCircle size={20} className="shrink-0 mt-0.5 text-verde-600" weight="fill" />
          ) : (
            <WarningCircle size={20} className="shrink-0 mt-0.5 text-red-600" weight="fill" />
          )}
          <div className="flex-1">{state.message}</div>
        </div>
      )}

      {/* Honeypot field - invisível para usuários legítimos, armadilha para bots */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="honeypot">Deixe este campo em branco</label>
        <input
          type="text"
          name="honeypot"
          id="honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="checkbox"
          id="is_anonymous"
          name="is_anonymous"
          value="true"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-5 h-5 text-cobalto rounded border-marinho/20 focus:ring-cobalto cursor-pointer"
        />
        <label htmlFor="is_anonymous" className="text-marinho/80 font-medium cursor-pointer select-none">
          Quero fazer este pedido anonimamente
        </label>
      </div>

      {!isAnonymous && (
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-marinho/80">
            Seu Nome
          </label>
          <input
            type="text"
            name="name"
            id="name"
            aria-invalid={Boolean(state?.errors?.name)}
            aria-describedby={state?.errors?.name ? "name-error" : undefined}
            placeholder="Como podemos te chamar?"
            className="w-full px-4 py-3 rounded-lg border border-marinho/20 focus:ring-2 focus:ring-cobalto focus:border-cobalto transition-colors motion-reduce:transition-none"
          />
          {state?.errors?.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1">
              {state.errors.name[0]}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="request" className="block text-sm font-medium text-marinho/80">
            Seu Pedido
          </label>
          <span
            aria-live="polite"
            className={`text-xs ${
              requestText.length > 1000
                ? "text-red-500 font-bold"
                : requestText.length > 0 && requestText.length < 5
                ? "text-cobalto font-medium"
                : "text-marinho/40"
            }`}
          >
            {requestText.length}/1000 caracteres {requestText.length > 0 && requestText.length < 5 && "(mínimo 5)"}
          </span>
        </div>
        <textarea
          name="request"
          id="request"
          rows={5}
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          maxLength={1000}
          aria-invalid={Boolean(state?.errors?.request)}
          aria-describedby={state?.errors?.request ? "request-error" : undefined}
          placeholder="Escreva aqui seu pedido de oração (mínimo 5 caracteres)..."
          className="w-full px-4 py-3 rounded-lg border border-marinho/20 focus:ring-2 focus:ring-cobalto focus:border-cobalto transition-colors motion-reduce:transition-none resize-y"
          required
        ></textarea>
        {state?.errors?.request && (
          <p id="request-error" className="text-red-500 text-sm mt-1">
            {state.errors.request[0]}
          </p>
        )}
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>

      <p className="text-xs text-neutral-500 text-center leading-relaxed">
        Ao enviar seu pedido, você concorda com nossa{" "}
        <a href="/privacidade" className="text-cobalto underline hover:text-marinho transition-colors font-medium">
          Política de Privacidade
        </a>
        . Não exigimos cadastro e você pode orar de forma 100% anônima.
      </p>
    </form>
  );
}
