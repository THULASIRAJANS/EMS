const db = require('../../config/mysql.config');

const Attendance = {
  create: (att, callback) => {
    const query = `
      INSERT INTO attendance (employee_id, date, time_in, time_out, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      att.employee_id,
      att.date,
      att.time_in,
      att.time_out,
      att.status,
    ];
    db.query(query, values, callback);
  },

  findAll: (callback) => {
    db.query('SELECT * FROM attendance', callback);
  },

  findByEmployeeId: (employee_id, callback) => {
    db.query(
      'SELECT * FROM attendance WHERE employee_id = ?',
      [employee_id],
      callback
    );
  },

  update: (id, att, callback) => {
    const query = `
      UPDATE attendance
      SET date=?, time_in=?, time_out=?, status=?
      WHERE employee_id=?
    `;
    const values = [att.date, att.time_in, att.time_out, att.status, id];
    db.query(query, values, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM attendance WHERE employee_id = ?', [id], callback);
  },
};

module.exports = Attendance;
