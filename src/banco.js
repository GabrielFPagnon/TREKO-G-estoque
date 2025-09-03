const { Pool } = require('pg');

const pool = new Pool({
  user:'postgres',
  host:'localhost',
  database:'gestao_de_estoque',
  password:'7031',
  port:5432
});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestao_de_estoque', 'postgres', '7031', {
    host: 'localhost',
    dialect: 'postgres'
});



async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

startServer();

module.exports = pool
module.exports= sequelize

