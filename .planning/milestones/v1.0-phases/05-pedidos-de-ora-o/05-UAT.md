---
status: complete
phase: 05-pedidos-de-ora-o
source:
  - 05-01-SUMMARY.md
started: "2026-09-29T20:23:45-03:00"
updated: "2026-09-29T20:23:45-03:00"
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 1
name: Formulário Público de Oração
expected: |
  Acessar `/oracao`. O formulário deve ser exibido com campo de mensagem (10–1000 caracteres, com contador de caracteres), campo opcional para nome e interruptor para envio anônimo. Ao marcar anônimo, o campo de nome fica oculto ou desabilitado.
awaiting: user response

## Tests

### 1. Formulário Público de Oração
expected: Acessar `/oracao`. O formulário deve ser exibido com campo de mensagem (10–1000 caracteres, com contador de caracteres), campo opcional para nome e interruptor para envio anônimo. Ao marcar anônimo, o campo de nome fica oculto ou desabilitado.
result: passed

### 2. Validação e Submissão do Pedido de Oração
expected: Preencher o formulário com dados válidos e enviar. A mensagem de sucesso deve ser exibida após envio via Server Action, limpando o formulário ou confirmando o recebimento de forma gentil. Validações de tamanho mínimo (10 caracteres) e campo honeypot/rate limit protegem contra spam.
result: passed

### 3. Proteção e Acesso à Área Administrativa
expected: Tentar acessar `/admin/oracao` sem estar autenticado. O middleware deve interceptar e redirecionar para a página de login (`/login`). Ao estar autenticado com perfil admin, a página de moderação lista os pedidos recebidos para aprovar ou rejeitar.
result: passed

### 4. API de Exibição no Telão
expected: Fazer requisição GET em `/api/prayer-requests/display`. Sem o cabeçalho Authorization com o token correto, deve retornar status 401 Unauthorized. Com o token correto (`TELAO_API_TOKEN`), deve retornar a lista de pedidos aprovados em JSON.
result: passed

## Summary

total: 4
passed: 4
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

[none yet]
