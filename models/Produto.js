const { DataTypes } = require('sequelize');
const sequelize = require('../src/banco'); // Corrigido o caminho para a pasta 'src'

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, // Nome deve ser obrigatório
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false, // Preço deve ser obrigatório
    defaultValue: 0.0,
  },
}, {
  tableName: 'produtos',
  timestamps: true, // Habilita createdAt e updatedAt
});

module.exports = Produto;