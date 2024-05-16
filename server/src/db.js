const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

let connection;

async function connectToDatabase() {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'my_database',
        port: 3306
      });
      console.log('Connected to MySQL database');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }
  return connection;
}

async function createUser(username, email, password) {
  try {
    const conn = await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await conn.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const conn = await connectToDatabase();
    const [rows] = await conn.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  connectToDatabase
};
