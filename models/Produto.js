const { DataTypes } = require('sequelize');
const sequelize = require('../src/banco');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'produtos',
  timestamps: true,
});

module.exports = Produto;