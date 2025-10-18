require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'gestao_de_estoque';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || '7031';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: console.log,
});

/**
 * Verifica conexão com o banco de dados.
 * Retorna { ok: boolean, message: string }
 */
async function checkConnection(timeoutMs = 5000) {
  try {
    // Tentativa direta de authenticate
    await sequelize.authenticate({ /* options */ });
    console.log('DB OK: Conexão estabelecida com sucesso.');
    return true;
  } catch (err) {
    // Tenta fornecer mensagem útil
    const msg = err && err.message ? err.message : String(err);
    console.log('DB ERROR: Falha ao conectar: ' + msg);
    return false;
  }
}

module.exports = sequelize;
module.exports.checkConnection = checkConnection;