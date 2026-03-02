const mysql = require('mysql');

const SabzlearnShopDB = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'product-manager-cms',
});

module.exports = SabzlearnShopDB;
