const db = require('../config/mysql.config');

const getPayslips = async (req, res) => {
  try {
    const [slips] = await db.query(
      'SELECT slip_id, month, year, created_at FROM payroll WHERE employee_id = ?',
      [req.user.id]
    );
    res.json(slips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const downloadPayslip = async (req, res) => {
  const { slipId } = req.params;
  try {
    const [slips] = await db.query(
      'SELECT file_path FROM payroll WHERE slip_id = ? AND employee_id = ?',
      [slipId, req.user.id]
    );
    if (!slips.length)
      return res.status(404).json({ message: 'Payslip not found' });
    res.download(slips[0].file_path);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPayslips, downloadPayslip };
