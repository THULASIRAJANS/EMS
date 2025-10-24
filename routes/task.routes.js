const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const allowRoles = require('../middleware/role.middleware');
const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getMyTasks,
  updateTaskStatus,
  assignTask,
} = require('../controllers/task.controller');

// Employee routes - Get assigned tasks
router.get('/my-tasks', authenticateToken, getMyTasks);
router.get('/my-tasks/:id', authenticateToken, getTaskById);
router.put('/my-tasks/:id/status', authenticateToken, updateTaskStatus);

// Admin/Manager routes - Task management
router.get(
  '/',
  authenticateToken,
  allowRoles('Admin', 'HR Recruiter', 'Manager'),
  getAllTasks
);
router.get(
  '/:id',
  authenticateToken,
  allowRoles('Admin', 'HR Recruiter', 'Manager'),
  getTaskById
);
router.post('/', authenticateToken, allowRoles('Admin', 'Manager'), createTask);
router.put(
  '/:id',
  authenticateToken,
  allowRoles('Admin', 'Manager'),
  updateTask
);
router.delete(
  '/:id',
  authenticateToken,
  allowRoles('Admin', 'Manager'),
  deleteTask
);
router.put(
  '/:id/assign',
  authenticateToken,
  allowRoles('Admin', 'Manager'),
  assignTask
);

module.exports = router;
