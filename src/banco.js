require('dotenv').config(); // Para carregar variáveis de .env
const { Sequelize } = require('sequelize');

// --- Configuração da Conexão ---
// Usar variáveis de ambiente ou cair para os padrões que você mencionou
const DB_NAME = process.env.DB_NAME || 'gestao_de_estoque';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '7031';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

console.log(`Tentando conectar ao banco: ${DB_NAME} em ${DB_HOST}:${DB_PORT}`);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: (msg) => console.log(`[SQL] ${msg}`), // Log de SQL mais claro
});

module.exports = sequelize;
