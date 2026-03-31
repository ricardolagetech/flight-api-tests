# API de Cadastro de Voos

API simples em Node.js com Express para cadastrar e listar voos em memoria.

## Requisitos

- Node.js 18+

## Instalacao

```bash
npm install
```

## Executar

```bash
npm start
```

## Swagger

Com a aplicacao em execucao, a documentacao interativa fica disponivel em:

```text
http://localhost:3000/docs
```

O JSON OpenAPI pode ser consultado em:

```text
http://localhost:3000/docs.json
```

## Endpoints

### POST /voos

Exemplo de payload:

```json
{
  "companhia": "LATAM",
  "origem": "GRU",
  "destino": "REC",
  "data": "2026-04-10",
  "horario": "09:45",
  "escalas": false,
  "duracao": "03:15",
  "preco": 899.9,
  "milhas": 12500
}
```

### GET /voos

Lista todos os voos cadastrados.