const express = require('express');
const app = express();
const cors = require('cors'); 
const loginRoutes = require('./loginRoutes'); 
const sequelize = require('./banco');
const router = require('./routes');
const Produto = require('../models/Produto');

const port = 8080;

app.use(express.json());
app.use('/', router);

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
  }
  
  app.use(cors({ 
    origin: 'http://localhost:5173' 
}));

app.use(express.json());


app.use('/api', loginRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Back-end rodando na porta ${PORT}`);
});
}

startServer();