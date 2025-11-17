require('dotenv-flow').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PORT,

  max: 20,
  idleTimeoutMillis: 30000,
});

module.exports = pool;
