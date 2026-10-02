/**
 * Remove todas as tags HTML e escapa caracteres perigosos preservando texto puro.
 * Conforme Decisão D-03 e PRAY-02: neutraliza HTML no servidor antes da validação e persistência.
 */
export function sanitizeHtml(input: string): string {
  if (!input) return "";

  return input
    // Remove tags completas <...>
    .replace(/<[^>]*>/g, "")
    // Escapa caracteres especiais de HTML
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        case "&":
          return "&amp;";
        default:
          return char;
      }
    })
    .trim();
}

/**
 * Decodifica entidades HTML para texto puro legível (WhatsApp, e-mails, SMS, etc.).
 */
export function decodeHtmlEntities(input: string): string {
  if (!input) return "";

  return input
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
