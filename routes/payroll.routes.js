const express = require('express');
const router = express.Router();
const {
  createPayroll,
  getAllPayrolls,
  getPayrollByEmployeeId,
  updatePayroll,
  deletePayroll,
} = require('../controllers/payroll.controller');

router.post('/', createPayroll);
router.get('/', getAllPayrolls);
router.get('/:employee_id', getPayrollByEmployeeId);
router.put('/:id', updatePayroll);
router.delete('/:id', deletePayroll);

module.exports = router;
