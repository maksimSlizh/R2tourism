// server/src/db.js
const fs = require('fs');
const path = require('path');

const usersFilePath = path.resolve(__dirname, '../data/users.json'); // Исправленный путь к файлу

function readDataFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function writeDataToFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function createUser(user) {
  const users = await readDataFromFile(usersFilePath);
  users.push(user);
  await writeDataToFile(usersFilePath, users);
}

async function getUserByEmail(email) {
  const users = await readDataFromFile(usersFilePath);
  return users.find(user => user.email === email);
}

module.exports = {
  createUser,
  getUserByEmail
};
