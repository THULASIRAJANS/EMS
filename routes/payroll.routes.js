const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const {
  getPayslips,
  downloadPayslip,
} = require('../controllers/payroll.controller');

router.get('/payslips', authenticateToken, getPayslips);
router.get('/payslips/:slipId', authenticateToken, downloadPayslip);

module.exports = router;
