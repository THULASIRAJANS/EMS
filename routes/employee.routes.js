const express = require('express');
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller');

const authenticateToken = require('../middleware/auth.middleware');
const allowRoles = require('../middleware/role.middleware');

// Routes with authentication & role-based access
router.get(
  '/',
  authenticateToken,
  allowRoles('Admin', 'HR Recruiter'), // Admin + HR can view all
  getEmployees
);

router.get(
  '/:id',
  authenticateToken,
  allowRoles('Admin', 'HR Recruiter', 'Employee'), // Employee can view own profile
  getEmployeeById
);

router.post(
  '/',
  authenticateToken,
  allowRoles('Admin'), // Only Admin can create employees
  createEmployee
);

router.put(
  '/:id',
  authenticateToken,
  allowRoles('Admin'), // Only Admin can update employee
  updateEmployee
);

router.delete(
  '/:id',
  authenticateToken,
  allowRoles('Admin'), // Only Admin can delete employee
  deleteEmployee
);

module.exports = router;
