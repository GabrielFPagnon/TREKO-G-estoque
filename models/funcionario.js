const { DataTypes } = require('sequelize');
const sequelize = require('../src/banco'); 

/* 
  Dados a serem checados no banco sobre o funcionário.
*/ 
const Funcionario = sequelize.define('Funcionario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigo: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false
  }
}, {
  tableName: 'funcionarios', 
  timestamps: false 
});

module.exports = Funcionario;