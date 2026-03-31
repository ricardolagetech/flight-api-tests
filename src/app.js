const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/docs.json', (_req, res) => {
  return res.status(200).json(swaggerDocument);
});

const voos = [];
let nextId = 1;

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DURATION_PATTERN = /^\d{2}:\d{2}$/;

function isValidDateString(value) {
  if (typeof value !== 'string' || !DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isValidDuration(value) {
  if (typeof value !== 'string' || !DURATION_PATTERN.test(value)) {
    return false;
  }

  const [hours, minutes] = value.split(':').map(Number);

  return hours >= 0 && hours <= 99 && minutes >= 0 && minutes <= 59;
}

function isPositiveNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function validateVoo(payload) {
  if (!payload.companhia || typeof payload.companhia !== 'string' || !payload.companhia.trim()) {
    return 'Companhia aérea é obrigatória.';
  }

  if (!payload.origem || typeof payload.origem !== 'string' || !payload.origem.trim()) {
    return 'Origem é obrigatória.';
  }

  if (!payload.destino || typeof payload.destino !== 'string' || !payload.destino.trim()) {
    return 'Destino é obrigatório.';
  }

  if (!isValidDateString(payload.data)) {
    return 'Data deve estar no formato YYYY-MM-DD.';
  }

  if (!isValidDuration(payload.duracao)) {
    return 'Duração deve estar no formato HH:mm (ex: 02:30).';
  }

  if (typeof payload.escalas !== 'boolean') {
    return "Campo 'escalas' deve ser true ou false.";
  }

  if (!isPositiveNumber(payload.preco)) {
    return 'Preço deve ser um número maior que zero.';
  }

  if (!isPositiveNumber(payload.milhas)) {
    return 'Milhas deve ser um numero maior que zero.';
  }

  if (
    payload.horario !== undefined &&
    payload.horario !== null &&
    typeof payload.horario !== 'string'
  ) {
    return 'Horario deve ser uma string.';
  }

  return null;
}

app.post('/voos', (req, res) => {
  const errorMessage = validateVoo(req.body);

  if (errorMessage) {
    return res.status(400).json({ mensagem: errorMessage });
  }

  const voo = {
    id: nextId++,
    companhia: req.body.companhia.trim(),
    origem: req.body.origem.trim(),
    destino: req.body.destino.trim(),
    data: req.body.data,
    horario: typeof req.body.horario === 'string' ? req.body.horario.trim() : undefined,
    escalas: req.body.escalas,
    duracao: req.body.duracao,
    preco: req.body.preco,
    milhas: req.body.milhas,
  };

  voos.push(voo);

  return res.status(201).json(voo);
});

app.get('/voos', (_req, res) => {
  return res.status(200).json(voos);
});

module.exports = app;