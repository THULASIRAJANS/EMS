const db = require('../../config/mysql.config');

const Payroll = {
  // ✅ Create Payroll Record
  create: (payroll, callback) => {
    const query = `
      INSERT INTO payroll (employee_id, basic_salary, allowances, deductions, pay_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      payroll.employee_id,
      payroll.basic_salary,
      payroll.allowances,
      payroll.deductions,
      payroll.pay_date,
    ];
    db.query(query, values, callback);
  },

  // ✅ Fetch all Payrolls
  findAll: (callback) => {
    db.query('SELECT * FROM payroll', callback);
  },

  // ✅ Fetch by Employee ID
  findByEmployeeId: (employee_id, callback) => {
    db.query('SELECT * FROM payroll WHERE employee_id = ?', [employee_id], callback);
  },

  // ✅ Update Payroll Record
  update: (id, payroll, callback) => {
    const query = `
      UPDATE payroll
      SET basic_salary=?, allowances=?, deductions=?, pay_date=?
      WHERE employee_id=?
    `;
    const values = [
      payroll.basic_salary,
      payroll.allowances,
      payroll.deductions,
      payroll.pay_date,
      id,
    ];
    db.query(query, values, callback);
  },

  // ✅ Delete Payroll Record
  delete: (id, callback) => {
    db.query('DELETE FROM payroll WHERE employee_id=?', [id], callback);
  },
};

module.exports = Payroll;
