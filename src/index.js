const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./banco');
const loginRoutes = require('./loginRoutes');
const produtoRoutes = require('./routes');
const Produto = require('../models/Produto.js');
const Funcionario = require('../models/Funcionario.js'); // Importar para garantir a sincronização

// --- CONFIGURAÇÃO ---
const port = process.env.PORT || 8080;

// --- MIDDLEWARES ---
app.use(express.json()); // Essencial para ler req.body

// --- CONFIGURAÇÃO DE CORS (A MAIS IMPORTANTE) ---
// Vamos permitir explicitamente as portas que o Vite usa.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:9999').split(',');

app.use(cors({
  origin: function (origin, callback) {
    // Permitir chamadas sem 'origin' (ex: Postman, apps mobile)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `A política de CORS para este site não permite acesso da Origem: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Habilitar 'pre-flight' (requisições OPTIONS) para todas as rotas

// --- ROTAS ---
// Prefixo /api para todas as rotas
app.use('/api', produtoRoutes);
app.use('/api', loginRoutes);

// --- INICIALIZAÇÃO DO SERVIDOR ---
async function startServer() {
  try {
    console.log('Autenticando com o banco de dados...');
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar todos os modelos de uma vez
    console.log('Sincronizando tabelas (Funcionario e Produto)...');
    await sequelize.sync({ alter: true }); // 'alter: true' é útil em dev, mas use com cuidado em prod.
    console.log('Todas as tabelas foram sincronizadas.');

    app.listen(port, () => {
      console.log(`Servidor rodando com sucesso na porta ${port}`);
    });
  } catch (error) {
    console.error('Incapaz de conectar ou sincronizar com o banco de dados:', error);
    process.exit(1); // Falha ao iniciar se o banco não conectar
  }
}

startServer();