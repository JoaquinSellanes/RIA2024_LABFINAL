require('dotenv').config();

module.exports = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET
};

