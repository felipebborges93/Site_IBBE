import crypto from "crypto";

export interface RateLimitRecord {
  count: number;
  lastReset: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora
export const MAX_REQUESTS = 3;

/**
 * Gera um hash SHA-256 do IP com salt para conformidade com a LGPD (sem armazenar IP bruto).
 */
export function hashIp(ip: string, salt: string = process.env.RATE_LIMIT_SALT || "ibbe-prayer-salt"): string {
  return crypto
    .createHash("sha256")
    .update(`${ip}:${salt}`)
    .digest("hex");
}

/**
 * Verifica e incrementa a taxa de requisições baseada no hash do IP.
 * Limite de 3 requisições por hora (D-02, PRAY-03).
 */
export function checkRateLimit(ipHash: string, now: number = Date.now()): { allowed: boolean; remaining: number } {
  const record = rateLimitStore.get(ipHash);

  // Limpeza/reset de registro se for novo ou se o intervalo de 1 hora passou
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ipHash, { count: 1, lastReset: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

/**
 * Limpa o armazenamento em memória (útil para testes unitários).
 */
export function clearRateLimitStore(): void {
  rateLimitStore.clear();
}
