'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export interface LoginResult {
  error?: string
}

export async function login(formData: FormData): Promise<LoginResult | void> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Por favor, preencha o e-mail e a senha.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: 'E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.',
    }
  }

  redirect('/admin/oracao')
}
