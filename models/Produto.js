const { DataTypes } = require('sequelize');
const sequelize = require('../src/banco');

/* 
  Dados a serem inseridas no banco sobre o produto. 
*/
const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false, 
    defaultValue: 0.0,
  },
}, {
  tableName: 'produtos',
  timestamps: true, 
});

module.exports = Produto;