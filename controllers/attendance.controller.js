const db = require('../config/mysql.config');

const clockIn = async (req, res) => {
  try {
    await db.query(
      'INSERT INTO attendance (employee_id, check_in) VALUES (?, NOW())',
      [req.user.id]
    );
    res.json({ message: 'Clock-in recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const clockOut = async (req, res) => {
  try {
    await db.query(
      'UPDATE attendance SET check_out = NOW() WHERE employee_id = ? AND check_out IS NULL ORDER BY check_in DESC LIMIT 1',
      [req.user.id]
    );
    res.json({ message: 'Clock-out recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAttendanceLogs = async (req, res) => {
  try {
    const [logs] = await db.query(
      'SELECT check_in, check_out FROM attendance WHERE employee_id = ? ORDER BY check_in DESC',
      [req.user.id]
    );
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { clockIn, clockOut, getAttendanceLogs };
