const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const {
  clockIn,
  clockOut,
  getAttendanceLogs,
} = require('../controllers/attendance.controller');

router.post('/check-in', authenticateToken, clockIn);
router.post('/check-out', authenticateToken, clockOut);
router.get('/logs', authenticateToken, getAttendanceLogs);

module.exports = router;
