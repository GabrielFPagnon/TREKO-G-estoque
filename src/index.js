const express = require('express');
const app = express();
const sequelize = require('./banco');
const router = require('./routes'); 
const Produto = require('./models/Produto');

const port = 8080;

app.use(express.json());
app.use('/', router); 

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza todos os modelos com o banco de dados
    await sequelize.sync({ alter: true }); 
    console.log('Tabelas sincronizadas.');

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

startServer();

