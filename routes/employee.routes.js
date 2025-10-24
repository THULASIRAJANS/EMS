const express = require('express');
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
  updateMyDetails,
  getMyDocuments,
  downloadDocument,
} = require('../controllers/employee.controller');

const authenticateToken = require('../middleware/auth.middleware');
const allowRoles = require('../middleware/role.middleware');

//Employee
router.get('/me/profile', authenticateToken, getMyProfile);
router.put('/me/details', authenticateToken, updateMyDetails);
router.get('/me/documents', authenticateToken, getMyDocuments);
router.get('/me/documents/:docId', authenticateToken, downloadDocument);

//Admin
router.get(
  '/',
  authenticateToken,
  allowRoles('Admin', 'HR Recruiter'),
  getEmployees
);
router.get(
  '/:id',
  authenticateToken,
  allowRoles('Admin', 'HR Recruiter', 'Employee'),
  getEmployeeById
);
router.post('/', authenticateToken, allowRoles('Admin'), createEmployee);
router.put('/:id', authenticateToken, allowRoles('Admin'), updateEmployee);
router.delete('/:id', authenticateToken, allowRoles('Admin'), deleteEmployee);

module.exports = router;
