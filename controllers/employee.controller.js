const db = require('../config/mysql.config');

const getEmployees = async (req, res) => {
  try {
    const [employees] = await db.query(
      `SELECT e.employee_id, e.first_name, e.last_name, e.email, e.phone, e.department, e.designation, e.date_of_joining, e.status,
              u.username, u.role
       FROM employees e
       JOIN users u ON e.user_id = u.user_id`
    );
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get employee by ID (Admin, HR, or Employee himself)
const getEmployeeById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query(
      `SELECT e.employee_id, e.first_name, e.last_name, e.email, e.phone, e.department, e.designation, e.date_of_joining, e.status,
              u.username, u.role
       FROM employees e
       JOIN users u ON e.user_id = u.user_id
       WHERE e.employee_id = ?`,
      [id]
    );

    if (!rows.length)
      return res.status(404).json({ error: 'Employee not found' });

    // Employee can view only their own profile
    if (req.user.role === 'Employee' && req.user.id != rows[0].user_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new employee (Admin only)
const createEmployee = async (req, res) => {
  const {
    username,
    email,
    role,
    first_name,
    last_name,
    phone,
    department,
    designation,
    date_of_joining,
  } = req.body;
  if (!username || !email || !first_name || !last_name)
    return res
      .status(400)
      .json({
        error: 'Username, email, first name and last name are required',
      });

  try {
    // 1. Insert into users table
    const [userResult] = await db.query(
      'INSERT INTO users (username, email, role) VALUES (?, ?, ?)',
      [username, email, role || 'Employee']
    );

    const user_id = userResult.insertId;

    // 2. Insert into employees table
    const [employeeResult] = await db.query(
      `INSERT INTO employees (user_id, first_name, last_name, email, phone, department, designation, date_of_joining, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        first_name,
        last_name,
        email,
        phone || null,
        department || null,
        designation || null,
        date_of_joining || null,
        'Active',
      ]
    );

    res
      .status(201)
      .json({
        message: 'Employee created',
        employee_id: employeeResult.insertId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update employee (Admin only)
const updateEmployee = async (req, res) => {
  const employee_id = req.params.id;
  const {
    username,
    email,
    role,
    first_name,
    last_name,
    phone,
    department,
    designation,
    date_of_joining,
    status,
  } = req.body;

  try {
    // Get user_id from employee_id
    const [empRows] = await db.query(
      'SELECT user_id FROM employees WHERE employee_id = ?',
      [employee_id]
    );
    if (!empRows.length)
      return res.status(404).json({ error: 'Employee not found' });

    const user_id = empRows[0].user_id;

    // Update users table
    await db.query(
      'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?',
      [username, email, role, user_id]
    );

    // Update employees table
    await db.query(
      `UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone = ?, department = ?, designation = ?, date_of_joining = ?, status = ?
       WHERE employee_id = ?`,
      [
        first_name,
        last_name,
        email,
        phone,
        department,
        designation,
        date_of_joining,
        status,
        employee_id,
      ]
    );

    res.json({ message: 'Employee updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete employee (Admin only)
const deleteEmployee = async (req, res) => {
  const employee_id = req.params.id;

  try {
    // Get user_id
    const [empRows] = await db.query(
      'SELECT user_id FROM employees WHERE employee_id = ?',
      [employee_id]
    );
    if (!empRows.length)
      return res.status(404).json({ error: 'Employee not found' });

    const user_id = empRows[0].user_id;

    // Delete from employees table first
    await db.query('DELETE FROM employees WHERE employee_id = ?', [
      employee_id,
    ]);

    // Delete from users table
    await db.query('DELETE FROM users WHERE user_id = ?', [user_id]);

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get own profile
const getMyProfile = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.employee_id, e.first_name, e.last_name, e.email, e.phone, e.department, e.designation, e.date_of_joining, e.status,
              u.username, u.role
       FROM employees e
       JOIN users u ON e.user_id = u.user_id
       WHERE u.user_id = ?`,
      [req.user.id]
    );

    if (!rows.length)
      return res.status(404).json({ error: 'Employee not found' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update own details
const updateMyDetails = async (req, res) => {
  const { username, email, first_name, last_name, phone } = req.body;
  try {
    // Update users table
    await db.query(
      'UPDATE users SET username = ?, email = ? WHERE user_id = ?',
      [username, email, req.user.id]
    );

    // Update employees table
    await db.query(
      `UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone = ? 
       WHERE user_id = ?`,
      [first_name, last_name, email, phone, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get employee documents
const getMyDocuments = async (req, res) => {
  try {
    const [docs] = await db.query(
      'SELECT doc_id, title, created_at FROM documents WHERE employee_id = ?',
      [req.user.id]
    );
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Download a document
const downloadDocument = async (req, res) => {
  const { docId } = req.params;
  try {
    const [docs] = await db.query(
      'SELECT file_path FROM documents WHERE doc_id = ? AND employee_id = ?',
      [docId, req.user.id]
    );

    if (!docs.length)
      return res.status(404).json({ message: 'Document not found' });

    res.download(docs[0].file_path);
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
  getMyProfile,
  updateMyDetails,
  getMyDocuments,
  downloadDocument,
};
