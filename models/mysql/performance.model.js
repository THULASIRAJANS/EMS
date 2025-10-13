const db = require('../../config/mysql.config');

const Performance = {
  // ✅ Create a performance record
  create: (perf, callback) => {
    const query = `
      INSERT INTO performance (employee_id, rating, feedback, review_date, reviewer)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      perf.employee_id,
      perf.rating,
      perf.feedback,
      perf.review_date,
      perf.reviewer,
    ];
    db.query(query, values, callback);
  },

  // ✅ Get all performance records
  findAll: (callback) => {
    db.query('SELECT * FROM performance', callback);
  },

  // ✅ Get by Employee ID
  findByEmployeeId: (employee_id, callback) => {
    db.query(
      'SELECT * FROM performance WHERE employee_id = ?',
      [employee_id],
      callback
    );
  },

  // ✅ Update performance record
  update: (id, perf, callback) => {
    const query = `
      UPDATE performance
      SET rating=?, feedback=?, review_date=?, reviewer=?
      WHERE employee_id=?
    `;
    const values = [
      perf.rating,
      perf.feedback,
      perf.review_date,
      perf.reviewer,
      id,
    ];
    db.query(query, values, callback);
  },

  // ✅ Delete performance record
  delete: (id, callback) => {
    db.query('DELETE FROM performance WHERE employee_id=?', [id], callback);
  },
};

module.exports = Performance;
