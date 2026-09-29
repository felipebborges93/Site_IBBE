# Telão API Documentation

A API do Telão permite a integração do sistema de projeção local da igreja com os pedidos de oração aprovados no site.

## Autenticação

Todas as chamadas à API do Telão devem incluir o cabeçalho `Authorization`:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

O token é definido na variável de ambiente `TELAO_API_TOKEN` no servidor da Vercel.

## Endpoints

### 1. Buscar Pedidos Pendentes de Exibição

Retorna os pedidos que já foram **aprovados** na moderação, mas ainda não foram **exibidos** no telão.

**Requisição:**
`GET /api/prayer-requests/display`

**Resposta de Sucesso (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "João (ou null se anônimo)",
      "request": "Ore pela minha família...",
      "is_anonymous": false
    }
  ]
}
```

### 2. Marcar Pedido como Exibido

Informa ao servidor que o pedido já apareceu no telão, para que ele não seja retornado nas próximas buscas.

**Requisição:**
`POST /api/prayer-requests/[id]/displayed`

**Resposta de Sucesso (200):**
```json
{
  "success": true
}
```
