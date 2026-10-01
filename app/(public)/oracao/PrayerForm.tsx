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
      {pending ? "Enviando pedido de oração..." : "Enviar pedido de oração"}
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
  const [allowPublicDisplay, setAllowPublicDisplay] = useState(false);
  const [requestText, setRequestText] = useState("");

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setRequestText("");
      setIsAnonymous(false);
      setAllowPublicDisplay(false);
    }
  }, [state]);

  const minChars = 5;
  const isUnderMin = requestText.trim().length > 0 && requestText.trim().length < minChars;

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-marinho/10"
    >
      {/* Mensagem de Feedback de Envio */}
      {state?.message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            state.success
              ? "bg-verde/10 border border-verde/25 text-verde"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {state.success ? (
            <CheckCircle size={22} className="shrink-0 mt-0.5 text-verde" weight="fill" />
          ) : (
            <WarningCircle size={22} className="shrink-0 mt-0.5 text-red-600" weight="fill" />
          )}
          <div className="flex-1 leading-relaxed">{state.message}</div>
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

      {/* Bloco de Identificação */}
      <div className="space-y-4">
        {!isAnonymous ? (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-marinho">
              Seu nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              aria-invalid={Boolean(state?.errors?.name)}
              aria-describedby={state?.errors?.name ? "name-error" : "name-hint"}
              placeholder="Ex.: Maria Silva ou João Pedro"
              className="w-full px-4 py-3 rounded-lg border border-marinho/20 focus:ring-2 focus:ring-cobalto focus:border-cobalto transition-colors motion-reduce:transition-none text-marinho placeholder:text-marinho/40"
            />
            <p id="name-hint" className="text-xs text-marinho/60">
              Como prefere ser chamado pela nossa equipe de oração.
            </p>
            {state?.errors?.name && (
              <p id="name-error" className="text-red-600 text-xs font-medium mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>
        ) : (
          <div className="p-3.5 bg-gelo-light rounded-xl border border-marinho/10 text-xs sm:text-sm text-marinho/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-verde shrink-0" aria-hidden="true" />
            <span>
              <strong>Envio anônimo ativado:</strong> seu nome não será solicitado nem registrado no banco de dados.
            </span>
          </div>
        )}

        {/* Opção de Anonimato */}
        <div className="flex items-center space-x-3 pt-1">
          <input
            type="checkbox"
            id="is_anonymous"
            name="is_anonymous"
            value="true"
            checked={isAnonymous}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsAnonymous(checked);
              if (checked) {
                setAllowPublicDisplay(false);
              }
            }}
            className="w-5 h-5 text-cobalto rounded border-marinho/20 focus:ring-cobalto cursor-pointer"
          />
          <label htmlFor="is_anonymous" className="text-xs sm:text-sm text-marinho/80 font-medium cursor-pointer select-none">
            Prefiro não me identificar (enviar pedido de forma anônima)
          </label>
        </div>

        {/* Permissão de exibição comunitária (apenas quando identificado) */}
        {!isAnonymous && (
          <div className="flex items-start space-x-3 pl-0.5 pt-1">
            <input
              type="checkbox"
              id="allow_public_display"
              name="allow_public_display"
              value="true"
              checked={allowPublicDisplay}
              onChange={(e) => setAllowPublicDisplay(e.target.checked)}
              className="w-5 h-5 text-cobalto rounded border-marinho/20 focus:ring-cobalto cursor-pointer mt-0.5"
            />
            <div className="flex-1">
              <label htmlFor="allow_public_display" className="text-xs sm:text-sm text-marinho/80 font-medium cursor-pointer select-none block leading-snug">
                Permitir compartilhar este pedido no telão durante a oração dos cultos
              </label>
              <p className="text-xs text-marinho/60 mt-0.5 leading-relaxed">
                Por padrão, seu pedido é mantido em sigilo exclusivo entre os líderes e intercessores da igreja.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bloco do Pedido */}
      <div className="space-y-2 pt-2 border-t border-marinho/10">
        <div className="flex justify-between items-baseline gap-2">
          <label htmlFor="request" className="block text-sm font-semibold text-marinho">
            Como podemos orar por você?
          </label>
          <span
            id="request-count"
            aria-live="polite"
            className={`text-xs ${
              requestText.length >= 1000
                ? "text-red-600 font-bold"
                : isUnderMin
                ? "text-cobalto font-medium"
                : "text-marinho/50"
            }`}
          >
            {requestText.length}/1.000 caracteres
            {isUnderMin && " (mínimo de 5 caracteres)"}
          </span>
        </div>

        <p className="text-xs text-marinho/60">
          Descreva sua necessidade, motivo de saúde, família, trabalho ou gratidão a Deus.
        </p>

        <textarea
          name="request"
          id="request"
          rows={5}
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          maxLength={1000}
          aria-invalid={Boolean(state?.errors?.request)}
          aria-describedby={
            state?.errors?.request
              ? "request-error request-count"
              : "request-count"
          }
          placeholder="Ex.: Gostaria de pedir oração pela saúde da minha família e por direção em uma decisão profissional importante..."
          className="w-full px-4 py-3 rounded-lg border border-marinho/20 focus:ring-2 focus:ring-cobalto focus:border-cobalto transition-colors motion-reduce:transition-none resize-y text-marinho placeholder:text-marinho/40"
          required
        />
        {state?.errors?.request && (
          <p id="request-error" className="text-red-600 text-xs font-medium mt-1">
            {state.errors.request[0]}
          </p>
        )}
      </div>

      {/* Botão de Envio */}
      <div className="pt-2">
        <SubmitButton />
      </div>

      {/* Nota de Privacidade e Segurança Pastoral */}
      <p className="text-xs text-marinho/60 text-center leading-relaxed">
        Suas informações são recebidas com discrição e respeito. Não exigimos cadastro prévio.{" "}
        <a
          href="/privacidade"
          className="text-cobalto underline hover:text-marinho transition-colors font-medium inline-block"
        >
          Leia nossa Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
