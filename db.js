const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usamos la variable de entorno DATABASE_URL
  ssl: {
    rejectUnauthorized: false, // Asegúrate de que el ssl esté habilitado
  },
});

module.exports = pool;
