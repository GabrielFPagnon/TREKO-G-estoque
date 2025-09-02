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

async function testC(){
try {
  await sequelize.authenticate();
  console.log('Connection show de bola.');
} catch (error) {
  console.error('Não conecto nesse diabo de database:', error);
}
}
testC();

module.exports = pool;

