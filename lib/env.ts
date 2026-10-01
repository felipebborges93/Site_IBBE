import { z } from "zod"

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || !val.startsWith("http")) {
        return "https://placeholder.supabase.co"
      }
      return val
    }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .optional()
    .transform((val) => val || "placeholder-anon-key"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY é obrigatória para operações privilegiadas de servidor.")
    .optional(),
  TELAO_API_TOKEN: z
    .string()
    .min(1, "TELAO_API_TOKEN é obrigatória para proteger a rota do telão.")
    .optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    TELAO_API_TOKEN: process.env.TELAO_API_TOKEN,
  })

  if (!result.success) {
    const formattedErrors = result.error.issues
      .map((issue) => ` - [${issue.path.join(".")}]: ${issue.message}`)
      .join("\n")

    throw new Error(
      `\n❌ Configuração de Ambiente Inválida:\n${formattedErrors}\n\nVerifique seu arquivo .env.local ou as variáveis no painel da Vercel/Supabase.\n`
    )
  }

  return result.data
}

// Executa validação de formato e presença
export const env = validateEnv()

/**
 * Validador explícito para rotas de servidor que requerem credenciais sensíveis (Service Role ou Telão)
 */
export function validateServerSecrets() {
  const missing: string[] = []
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY")
  }
  if (!process.env.TELAO_API_TOKEN) {
    missing.push("TELAO_API_TOKEN")
  }

  if (missing.length > 0) {
    throw new Error(
      `\n❌ Chaves secretas de servidor ausentes: ${missing.join(", ")}.\nDefina-as em .env.local ou nas variáveis da Vercel.\n`
    )
  }

  return {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    TELAO_API_TOKEN: process.env.TELAO_API_TOKEN as string,
  }
}
