# Igreja Batista Bethel em Resende (IBBE) - Site Oficial

Bem-vindo ao repositório do site oficial da IBBE. Este projeto foi construído utilizando tecnologias modernas para oferecer a melhor experiência, performance e facilidade de manutenção.

## 🚀 Tecnologias Principais
- **Next.js 14+ (App Router):** Framework React para SSR/SSG.
- **Tailwind CSS:** Para estilização utilitária rápida e responsiva.
- **Supabase:** Backend-as-a-Service para banco de dados PostgreSQL e Autenticação (pedidos de oração).
- **Vercel KV (Redis):** Cache global distribuído (ex: fallback do YouTube).
- **TypeScript:** Para segurança de tipos e melhor Developer Experience (DX).

## 🛠 Pré-requisitos
- Node.js >= 18
- npm >= 9
- Conta no [Supabase](https://supabase.com)
- Conta na [Vercel](https://vercel.com) (opcional, para Vercel KV em prod)

## 💻 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPO>
   cd Site_IBBE
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Copie o arquivo `.env.example` para um novo arquivo chamado `.env.local` e preencha os valores.
   ```bash
   cp .env.example .env.local
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## ✅ Testes

O projeto utiliza **Playwright** para testes End-to-End (E2E) dos fluxos críticos da aplicação.

Para rodar os testes localmente:
```bash
# Executa os testes no modo Chromium (headless)
npm run test:e2e -- --project=chromium

# Para ver os testes rodando com interface (UI mode):
npx playwright test --ui
```

## 🏗 Estrutura do Projeto

- `src/app`: Rotas e páginas usando o Next.js App Router.
- `src/components`: Componentes React reutilizáveis.
- `src/lib`: Funções utilitárias, clientes (ex: Supabase cliente).
- `tests/e2e`: Testes E2E com Playwright.
- `public`: Imagens e arquivos estáticos.

## 📝 Scripts Disponíveis
- `npm run dev`: Inicia o servidor local de dev.
- `npm run build`: Cria a build de produção.
- `npm run start`: Inicia a aplicação na versão de build.
- `npm run lint`: Roda o linter (ESLint).
- `npm run test:e2e`: Roda os testes E2E do Playwright.
