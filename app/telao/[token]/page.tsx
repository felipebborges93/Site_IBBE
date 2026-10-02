import { validateServerSecrets } from "@/lib/env";
import TelaoDisplay from "./TelaoDisplay";

interface TelaoPageProps {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

export default async function TelaoPage({ params }: TelaoPageProps) {
  const { token } = await params;

  let expectedToken: string | undefined;
  try {
    const secrets = validateServerSecrets();
    expectedToken = secrets.TELAO_API_TOKEN;
  } catch {
    expectedToken = process.env.TELAO_API_TOKEN;
  }

  const isAuthorized =
    Boolean(expectedToken) &&
    Boolean(token) &&
    token.trim() === expectedToken?.trim();

  if (!isAuthorized) {
    return (
      <main className="min-h-screen h-screen w-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Acesso Restrito ao Telão
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Acesso restrito ao telão da igreja. Token de autorização inválido ou ausente.
          </p>
          <div className="pt-2 text-xs text-slate-600 font-mono">
            IBBE &bull; Projeção de Orações
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen h-screen w-screen overflow-hidden bg-slate-950 text-white select-none flex flex-col font-sans">
      <TelaoDisplay token={token} />
    </main>
  );
}
