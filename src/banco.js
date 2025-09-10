const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestao_de_estoque', 'postgres', '7031', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

