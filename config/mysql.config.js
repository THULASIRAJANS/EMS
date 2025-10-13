const mysql = require('mysql2/promise'); // promise version
const dotenv = require('dotenv');

dotenv.config();

// Create a pool (no need for db.connect)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max concurrent connections
  queueLimit: 0,
});

console.log('✅ MySQL Pool Created Successfully');

module.exports = db;
