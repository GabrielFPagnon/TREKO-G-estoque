const express = require('express');
const app = express();
const cors = require('cors');
const loginRoutes = require('./loginRoutes');
const sequelize = require('./banco');
const router = require('./routes');
const Produto = require('../models/Produto');

// Porta configurável (process.env.PORT) ou fallback para 8080
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// CORS: por padrão permite o Vite dev server em 5173. Para produção, configure a variável
// de ambiente CORS_ORIGINS (comma-separated) ou ajuste conforme necessário.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',');
app.use(cors({
  origin: function (origin, callback) {
    // permitir requests sem origin (ex: curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.indexOf('*') !== -1) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true
}));

// Rotas
// Expor as rotas padrão sob o prefixo /api para compatibilidade com frontend
app.use('/api', router);
app.use('/api', loginRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await Produto.sync({ alter: true });
    console.log('Tabela de produtos sincronizada.');

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ou sincronizar com o banco de dados:', error);
    process.exit(1);
  }
}

startServer();