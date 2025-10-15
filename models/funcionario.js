const { DataTypes } = require('sequelize');
const sequelize = require('../src/banco'); 

const Funcionario = sequelize.define('Funcionario', {
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

sequelize.sync().then(() => {
    console.log('Tabela de Funcionários sincronizada.');
}).catch(error => {
    console.error('Erro ao sincronizar tabela de Funcionários:', error);
});

module.exports = Funcionario;