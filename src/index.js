const express = require('express');
const app = express();
//const sequelize = require('./banco'); 
const router = require('./routes'); 


const port = 8080;

app.use(express.json());
app.use('/', router); 

app.listen(port)

/*
async function startServer() {
  try {
  
    await sequelize.sync({ alter: true }); 
    console.log('Modelos sincronizados com o banco de dados.');

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
  }
}

startServer();
*/