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

Para desenvolvimento local, crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
API_BASIC_USER=seu-usuario
API_BASIC_PASS=sua-senha
```

Em ambiente de producao ou automacao futura, continue injetando as variaveis de ambiente no processo e nao versione o arquivo `.env`.

Se preferir, ainda e possivel informar as variaveis manualmente antes de subir a API:

```powershell
$env:API_BASIC_USER="seu-usuario"
$env:API_BASIC_PASS="sua-senha"
npm start
```

Se as variaveis nao estiverem definidas, a API nao sobe.

Exemplo de credenciais para uso apenas local:

```powershell
$env:API_BASIC_USER="interno"
$env:API_BASIC_PASS="minha-senha-local"
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