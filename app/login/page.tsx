'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import { Lock, EnvelopeSimple, WarningCircle, CircleNotch, ArrowLeft } from '@phosphor-icons/react'
import { login } from './actions'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setErrorMessage(result.error)
      }
    })
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-gelo/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-cinza/15 p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-azul/10 text-azul mb-4">
            <Lock size={28} weight="duotone" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-marinho tracking-tight">
            Acesso Restrito
          </h1>
          <p className="text-sm text-marinho/70 mt-2">
            Área administrativa da Igreja Batista Bethel em Resende
          </p>
        </div>

        {/* Feedback visual de erro / Toast inline */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <WarningCircle size={20} className="shrink-0 mt-0.5 text-red-600" weight="fill" />
            <div className="flex-1 font-medium">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-marinho/80 mb-2"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-marinho/40">
                <EnvelopeSimple size={20} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={isPending}
                placeholder="seu.email@ibbe.com.br"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cinza/30 text-marinho bg-white placeholder:text-marinho/30 focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-marinho/80 mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-marinho/40">
                <Lock size={20} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                disabled={isPending}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-cinza/30 text-marinho bg-white placeholder:text-marinho/30 focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold text-white bg-azul hover:bg-azul/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azul shadow-lg shadow-azul/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <CircleNotch size={20} className="animate-spin" />
                <span>Entrando...</span>
              </>
            ) : (
              <span>Entrar</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-cinza/15 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-marinho/60 hover:text-azul transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            Voltar para o site principal
          </Link>
        </div>
      </div>
    </div>
  )
}
