const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'eCocina',
  password: 'Carrillo10',
  port: 5432, 
});

module.exports = pool;
