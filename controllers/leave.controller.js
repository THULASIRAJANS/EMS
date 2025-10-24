const db = require('../config/mysql.config');

const getLeaveBalances = async (req, res) => {
  try {
    const [balances] = await db.query(
      'SELECT leave_type, balance FROM leave_balances WHERE employee_id = ?',
      [req.user.id]
    );
    res.json(balances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const requestLeave = async (req, res) => {
  const { leave_type, start_date, end_date } = req.body;
  try {
    await db.query(
      'INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, status) VALUES (?, ?, ?, ?, "Pending")',
      [req.user.id, leave_type, start_date, end_date]
    );
    res.json({ message: 'Leave request submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLeaveRequests = async (req, res) => {
  try {
    const [requests] = await db.query(
      'SELECT req_id, leave_type, start_date, end_date, status FROM leave_requests WHERE employee_id = ? ORDER BY start_date DESC',
      [req.user.id]
    );
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelLeave = async (req, res) => {
  const { reqId } = req.params;
  try {
    await db.query(
      'UPDATE leave_requests SET status = "Cancelled" WHERE req_id = ? AND employee_id = ?',
      [reqId, req.user.id]
    );
    res.json({ message: 'Leave request cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getLeaveBalances,
  requestLeave,
  getLeaveRequests,
  cancelLeave,
};
