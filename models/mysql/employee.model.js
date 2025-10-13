const db = require('../../config/mysql.config');

const Employee = {
  create: (emp, callback) => {
    const query = `
      INSERT INTO employees 
      (user_id, first_name, last_name, email, department, designation, date_of_joining)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      emp.user_id,
      emp.first_name,
      emp.last_name,
      emp.email,
      emp.department,
      emp.designation,
      emp.date_of_joining,
    ];
    db.query(query, values, callback);
  },

  findAll: (callback) => {
    db.query('SELECT * FROM employees', callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM employees WHERE user_id = ?', [id], callback);
  },

  update: (id, emp, callback) => {
    const query = `
      UPDATE employees 
      SET first_name=?, last_name=?, email=?, department=?, designation=?, date_of_joining=? 
      WHERE user_id=?
    `;
    const values = [
      emp.first_name,
      emp.last_name,
      emp.email,
      emp.department,
      emp.designation,
      emp.date_of_joining,
      id,
    ];
    db.query(query, values, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM employees WHERE user_id=?', [id], callback);
  },
};

module.exports = Employee;
