const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'my_database',
      port: 3306
    });
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

async function createUser(username, email, password) {
  const connection = await connectToDatabase();
  const [result] = await connection.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result.insertId;
}

async function getUserByEmail(email) {
  const connection = await connectToDatabase();
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail
};
