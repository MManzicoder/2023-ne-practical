const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "equipment_distribution",
  password: "coder123",
  port: 5432,
});
exports.pool = pool;
