const db = require('../config/mysql.config');

// Create a new task (Admin/Manager only)
const createTask = async (req, res) => {
  const {
    title,
    description,
    assigned_to,
    priority,
    due_date,
    project_name,
  } = req.body;

  if (!title || !assigned_to) {
    return res.status(400).json({ error: 'Title and assigned_to are required' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO tasks (title, description, assigned_to, assigned_by, priority, due_date, project_name, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())`,
      [
        title,
        description || null,
        assigned_to,
        req.user.id,
        priority || 'Medium',
        due_date || null,
        project_name || null,
      ]
    );

    res.status(201).json({
      message: 'Task created successfully',
      task_id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a task (Admin/Manager only)
const updateTask = async (req, res) => {
  const task_id = req.params.id;
  const {
    title,
    description,
    assigned_to,
    priority,
    due_date,
    project_name,
    status,
  } = req.body;

  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE task_id = ?', [
      task_id,
    ]);

    if (!tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.query(
      `UPDATE tasks 
       SET title = ?, description = ?, assigned_to = ?, priority = ?, due_date = ?, project_name = ?, status = ?, updated_at = NOW()
       WHERE task_id = ?`,
      [
        title,
        description,
        assigned_to,
        priority,
        due_date,
        project_name,
        status,
        task_id,
      ]
    );

    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a task (Admin/Manager only)
const deleteTask = async (req, res) => {
  const task_id = req.params.id;

  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE task_id = ?', [
      task_id,
    ]);

    if (!tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.query('DELETE FROM tasks WHERE task_id = ?', [task_id]);

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all tasks (Admin/Manager only)
const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(
      `SELECT t.task_id, t.title, t.description, t.priority, t.status, t.due_date, t.project_name, t.created_at, t.updated_at,
              e1.first_name AS assigned_to_first_name, e1.last_name AS assigned_to_last_name, e1.email AS assigned_to_email,
              e2.first_name AS assigned_by_first_name, e2.last_name AS assigned_by_last_name
       FROM tasks t
       LEFT JOIN employees e1 ON t.assigned_to = e1.user_id
       LEFT JOIN employees e2 ON t.assigned_by = e2.user_id
       ORDER BY t.created_at DESC`
    );

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  const task_id = req.params.id;

  try {
    const [tasks] = await db.query(
      `SELECT t.task_id, t.title, t.description, t.priority, t.status, t.due_date, t.project_name, t.created_at, t.updated_at,
              t.assigned_to, t.assigned_by,
              e1.first_name AS assigned_to_first_name, e1.last_name AS assigned_to_last_name, e1.email AS assigned_to_email,
              e2.first_name AS assigned_by_first_name, e2.last_name AS assigned_by_last_name
       FROM tasks t
       LEFT JOIN employees e1 ON t.assigned_to = e1.user_id
       LEFT JOIN employees e2 ON t.assigned_by = e2.user_id
       WHERE t.task_id = ?`,
      [task_id]
    );

    if (!tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // If employee role, ensure they can only view their own tasks
    if (req.user.role === 'Employee' && req.user.id !== tasks[0].assigned_to) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(tasks[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get tasks assigned to the logged-in user
const getMyTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(
      `SELECT t.task_id, t.title, t.description, t.priority, t.status, t.due_date, t.project_name, t.created_at, t.updated_at,
              e.first_name AS assigned_by_first_name, e.last_name AS assigned_by_last_name
       FROM tasks t
       LEFT JOIN employees e ON t.assigned_by = e.user_id
       WHERE t.assigned_to = ?
       ORDER BY t.due_date ASC, t.created_at DESC`,
      [req.user.id]
    );

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update task status (Employee can update status of their tasks)
const updateTaskStatus = async (req, res) => {
  const task_id = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const validStatuses = ['Pending', 'In Progress', 'Completed', 'On Hold'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE task_id = ? AND assigned_to = ?',
      [task_id, req.user.id]
    );

    if (!tasks.length) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    await db.query(
      'UPDATE tasks SET status = ?, updated_at = NOW() WHERE task_id = ?',
      [status, task_id]
    );

    res.json({ message: 'Task status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Assign or reassign a task (Admin/Manager only)
const assignTask = async (req, res) => {
  const task_id = req.params.id;
  const { assigned_to } = req.body;

  if (!assigned_to) {
    return res.status(400).json({ error: 'assigned_to is required' });
  }

  try {
    // Check if task exists
    const [tasks] = await db.query('SELECT * FROM tasks WHERE task_id = ?', [
      task_id,
    ]);

    if (!tasks.length) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if employee exists
    const [employees] = await db.query(
      'SELECT * FROM employees WHERE user_id = ?',
      [assigned_to]
    );

    if (!employees.length) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await db.query(
      'UPDATE tasks SET assigned_to = ?, updated_at = NOW() WHERE task_id = ?',
      [assigned_to, task_id]
    );

    res.json({ message: 'Task assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getMyTasks,
  updateTaskStatus,
  assignTask,
};