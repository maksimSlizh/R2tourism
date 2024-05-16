const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_database',
  port: 3306
};

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

async function initializeDatabase() {
  const connection = await connectToDatabase();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    connection.end();
  }
}

async function createUser(username, email, password) {
  const connection = await connectToDatabase();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    connection.end();
  }
}

async function getUserByEmail(email) {
  const connection = await connectToDatabase();
  try {
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  } finally {
    connection.end();
  }
}

module.exports = {
  initializeDatabase,
  createUser,
  getUserByEmail,
  connectToDatabase
};
