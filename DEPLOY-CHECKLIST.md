# Checklist de Deploy - Site IBBE

Este documento descreve os passos necessários para configurar o ambiente de produção do site da IBBE.

## 1. Supabase (Banco de Dados e Configurações)
- [ ] Criar projeto no [Supabase](https://supabase.com).
- [ ] Executar migrações do banco de dados na aba SQL Editor (se houver dumps ou arquivos `.sql`).
- [ ] Verificar se a tabela `prayer_requests` existe.
- [ ] **Row Level Security (RLS):** Garantir que a tabela `prayer_requests` permite `INSERT` anônimo e bloqueia `SELECT`/`UPDATE`/`DELETE` público.
- [ ] Copiar `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` para as variáveis da Vercel.
- [ ] Copiar `SUPABASE_SERVICE_ROLE_KEY` (se aplicável para rotas seguras de API).

## 2. YouTube Data API v3
- [x] Acessar [Google Cloud Console](https://console.cloud.google.com/).
- [x] Criar um novo projeto.
- [x] Habilitar a **YouTube Data API v3**.
- [x] Criar credencial de **Chave de API**.
- [x] **Segurança da Chave:** Restringir a chave para o domínio de produção (se chamada pelo frontend) ou ocultá-la no backend/Vercel (se chamada só no server-side).
- [x] Obter o Channel ID do YouTube da Igreja.
- [x] Inserir `YOUTUBE_API_KEY` e `YOUTUBE_CHANNEL_ID` nas variáveis da Vercel.

## 3. Vercel KV (Redis)
- [ ] Acessar painel do projeto na Vercel.
- [ ] Ir na aba `Storage`.
- [ ] Criar e linkar um novo **Vercel KV**.
- [ ] Garantir que `KV_REST_API_URL` e `KV_REST_API_TOKEN` estejam expostos para o ambiente (`Preview` e `Production`).

## 4. Vercel Deploy & Domínio Personalizado
- [ ] Importar repositório na [Vercel](https://vercel.com).
- [ ] No painel do projeto (`Settings` > `Environment Variables`), preencher todas as variáveis de `.env.example`.
- [ ] Trigger deployment: realizar o primeiro build de produção e verificar se finaliza sem erros.
- [ ] **Domínio Personalizado:** Ir em `Settings` > `Domains`.
- [ ] Adicionar o domínio (ex: `ibberesende.com.br`).
- [ ] Configurar registros DNS (CNAME/A/TXT) no provedor de domínio (Registro.br, Cloudflare, etc).
- [ ] Esperar a Vercel gerar o certificado SSL automaticamente.
- [ ] Validar acesso pelo domínio oficial e verificar HTTPS.

## 5. Testes Finais de Validação
- [ ] Acessar o site em produção pelo celular (verificar UI responsiva).
- [ ] Acessar a home e verificar se os vídeos do YouTube/Fallback carregam rápido (verificando o Vercel KV).
- [ ] Enviar um pedido de oração de teste na aba "Pedidos de Oração".
- [ ] Confirmar se o pedido aparece no painel do Supabase.
