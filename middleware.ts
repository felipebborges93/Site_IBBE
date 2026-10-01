import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Intercepta todas as requisições exceto:
     * - _next/static (arquivos estáticos gerados pelo Next.js)
     * - _next/image (rotas de otimização de imagens)
     * - favicon.ico, sitemap.xml, robots.txt
     * - arquivos de mídia/estáticos com extensão (ex: .svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
