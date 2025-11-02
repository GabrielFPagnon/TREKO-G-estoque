const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./banco');
const loginRoutes = require('./loginRoutes');
const produtoRoutes = require('./routes');
const Produto = require('../models/Produto.js');
const Funcionario = require('../models/Funcionario.js');

/* 
  Definição da porta do servidor 
*/ 
const port = process.env.PORT || 8080;

app.use(express.json());

/* 
  Configuração do CORS 
*/
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:9999').split(',');

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `A política de CORS para este site não permite acesso da Origem: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use('/api', produtoRoutes);
app.use('/api', loginRoutes);
/* 
  Inicialização do servidor e conexão com o banco de dados 
*/
async function startServer() {
  try {
    console.log('Autenticando com o banco de dados...');
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    console.log('Sincronizando tabelas (Funcionario e Produto)...');
    await sequelize.sync({ alter: true }); 
    console.log('Todas as tabelas foram sincronizadas.');

    app.listen(port, () => {
      console.log(`Servidor rodando com sucesso na porta ${port}`);
    });
  } catch (error) {
    console.error('Incapaz de conectar ou sincronizar com o banco de dados:', error);
    process.exit(1); 
  }
}

startServer();