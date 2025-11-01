const { DataTypes } = require('sequelize');
const sequelize = require('../src/banco'); // Corrigido o caminho para a pasta 'src'

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
  timestamps: false // Desabilitado (como no seu original)
});

module.exports = Funcionario;