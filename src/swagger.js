module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API de Cadastro de Voos',
    version: '1.0.0',
    description: 'API simples para cadastrar e listar voos consultados manualmente.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  tags: [
    {
      name: 'Voos',
      description: 'Operacoes de cadastro e listagem de voos',
    },
  ],
  paths: {
    '/voos': {
      post: {
        tags: ['Voos'],
        summary: 'Cadastrar um voo',
        description: 'Cadastra um voo em memoria com validacoes de negocio.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NovoVoo',
              },
              examples: {
                vooValido: {
                  summary: 'Payload valido',
                  value: {
                    companhia: 'LATAM',
                    origem: 'GRU',
                    destino: 'REC',
                    data: '2026-04-10',
                    horario: '09:45',
                    escalas: false,
                    duracao: '03:15',
                    preco: 899.9,
                    milhas: 12500,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Voo cadastrado com sucesso.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Voo',
                },
              },
            },
          },
          '400': {
            description: 'Erro de validacao.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErroValidacao',
                },
                examples: {
                  companhiaObrigatoria: {
                    summary: 'Companhia ausente',
                    value: {
                      mensagem: 'Companhia aérea é obrigatória.',
                    },
                  },
                  dataInvalida: {
                    summary: 'Data invalida',
                    value: {
                      mensagem: 'Data deve estar no formato YYYY-MM-DD.',
                    },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Voos'],
        summary: 'Listar voos',
        description: 'Retorna todos os voos cadastrados em memoria.',
        responses: {
          '200': {
            description: 'Lista de voos retornada com sucesso.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Voo',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      NovoVoo: {
        type: 'object',
        required: [
          'companhia',
          'origem',
          'destino',
          'data',
          'escalas',
          'duracao',
          'preco',
          'milhas',
        ],
        properties: {
          companhia: {
            type: 'string',
            example: 'LATAM',
          },
          origem: {
            type: 'string',
            example: 'GRU',
          },
          destino: {
            type: 'string',
            example: 'REC',
          },
          data: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            example: '2026-04-10',
          },
          horario: {
            type: 'string',
            nullable: true,
            example: '09:45',
          },
          escalas: {
            type: 'boolean',
            example: false,
          },
          duracao: {
            type: 'string',
            pattern: '^\\d{2}:\\d{2}$',
            example: '03:15',
          },
          preco: {
            type: 'number',
            exclusiveMinimum: 0,
            example: 899.9,
          },
          milhas: {
            type: 'number',
            exclusiveMinimum: 0,
            example: 12500,
          },
        },
      },
      Voo: {
        allOf: [
          {
            $ref: '#/components/schemas/NovoVoo',
          },
          {
            type: 'object',
            required: ['id'],
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
            },
          },
        ],
      },
      ErroValidacao: {
        type: 'object',
        required: ['mensagem'],
        properties: {
          mensagem: {
            type: 'string',
            example: 'Preço deve ser um número maior que zero.',
          },
        },
      },
    },
  },
};