require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  charset: 'utf8mb4', // 이 부분 추가
};

async function PetSitters() {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT * FROM PetSitters'); // pet_sitters를 실제 테이블명으로 변경
  connection.end();
  return rows;
}

module.exports = { PetSitters };
