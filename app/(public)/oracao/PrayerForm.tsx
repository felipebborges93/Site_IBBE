"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitPrayerRequest } from "@/app/actions/prayer";
import { useState } from "react";
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
  const [state, formAction] = useFormState(submitPrayerRequest, null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [requestText, setRequestText] = useState("");

  return (
    <form action={formAction} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-marinho">
      {state?.message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`p-4 rounded-lg text-sm font-medium ${state.success ? 'bg-verde-50 text-verde-800' : 'bg-red-50 text-red-800'}`}
        >
          {state.message}
        </div>
      )}

      {/* Honeypot field - hidden from users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Não preencha este campo se for humano</label>
        <input type="text" name="honeypot" id="honeypot" tabIndex={-1} autoComplete="off" />
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
        <label htmlFor="is_anonymous" className="text-marinho/80 font-medium cursor-pointer">
          Quero fazer este pedido anonimamente
        </label>
      </div>

      {!isAnonymous && (
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-marinho/80">Seu Nome (opcional)</label>
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
            <p id="name-error" className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="request" className="block text-sm font-medium text-marinho/80">Seu Pedido</label>
          <span
            aria-live="polite"
            className={`text-xs ${requestText.length > 1000 ? 'text-red-500 font-bold' : requestText.length > 0 && requestText.length < 10 ? 'text-cobalto font-medium' : 'text-marinho/40'}`}
          >
            {requestText.length}/1000 caracteres {requestText.length > 0 && requestText.length < 10 && "(mínimo 10)"}
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
          placeholder="Escreva aqui seu pedido de oração (mínimo 10 caracteres)..."
          className="w-full px-4 py-3 rounded-lg border border-marinho/20 focus:ring-2 focus:ring-cobalto focus:border-cobalto transition-colors motion-reduce:transition-none resize-y"
          required
        ></textarea>
        {state?.errors?.request && (
          <p id="request-error" className="text-red-500 text-sm mt-1">{state.errors.request[0]}</p>
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
