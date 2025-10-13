const Payroll = require('../models/mysql/payroll.model');

// ✅ Create payroll
const createPayroll = (req, res) => {
  const newPayroll = req.body;

  // Auto-calculate net_salary
  newPayroll.net_salary =
    (newPayroll.basic_salary || 0) +
    (newPayroll.allowances || 0) -
    (newPayroll.deductions || 0);

  Payroll.create(newPayroll, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({
        message: 'Payroll record created successfully!',
        id: result.insertId,
      });
  });
};

// ✅ Get all payrolls
const getAllPayrolls = (req, res) => {
  Payroll.findAll((err, records) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(records);
  });
};

// ✅ Get payroll by employee_id
const getPayrollByEmployeeId = (req, res) => {
  const { employee_id } = req.params;
  Payroll.findByEmployeeId(employee_id, (err, records) => {
    if (err) return res.status(500).json({ error: err.message });
    if (records.length === 0)
      return res.status(404).json({ message: 'No payroll record found' });
    res.json(records);
  });
};

// ✅ Update payroll
const updatePayroll = (req, res) => {
  const { id } = req.params;
  const payroll = req.body;

  // Recalculate net salary before updating
  payroll.net_salary =
    (payroll.basic_salary || 0) +
    (payroll.allowances || 0) -
    (payroll.deductions || 0);

  Payroll.update(id, payroll, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Payroll not found' });
    res.json({ message: 'Payroll updated successfully' });
  });
};

// ✅ Delete payroll
const deletePayroll = (req, res) => {
  const { id } = req.params;
  Payroll.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Payroll not found' });
    res.json({ message: 'Payroll deleted successfully' });
  });
};

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollByEmployeeId,
  updatePayroll,
  deletePayroll,
};
