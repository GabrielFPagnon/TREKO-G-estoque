const sequelize = require('./src/banco');

(async () => {
  try {
    const ok = await sequelize.checkConnection();
    process.exit(ok ? 0 : 2);
  } catch (err) {
    console.log('DB ERROR: Erro inesperado no checkConnection:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
