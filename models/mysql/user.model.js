const db = require('../../config/mysql.config');

const User = {
  create: (user, callback) => {
    const query = `INSERT INTO users (username,email,password,role) VALUES (?, ?, ?, ?)`;
    const values = [user.username, user.email, user.password, user.role];
    db.query(query, values, callback);
  },

  findAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  }
};

module.exports = User;
