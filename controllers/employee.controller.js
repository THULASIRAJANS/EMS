const db = require('../config/mysql.config');

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const [employees] = await db.query(
      'SELECT user_id, username, email, role, created_at FROM users'
    );
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  const id = req.params.id;

  try {
    const [employees] = await db.query(
      'SELECT user_id, username, email, role, created_at FROM users WHERE user_id = ?',
      [id]
    );

    const employee = employees[0];
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // Optional: Employee can only view own profile
    if (req.user.role === 'Employee' && req.user.id != employee.user_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  const { username, email, role } = req.body;
  if (!username || !email)
    return res.status(400).json({ error: 'Username and email are required' });

  try {
    const [result] = await db.query(
      'INSERT INTO users (username, email, role) VALUES (?, ?, ?)',
      [username, email, role || 'Employee']
    );
    res.status(201).json({ message: 'Employee created', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const { username, email, role } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?',
      [username, email, role, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Employee not found' });

    res.json({ message: 'Employee updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Employee not found' });

    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
