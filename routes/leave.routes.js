const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const {
  getLeaveBalances,
  requestLeave,
  getLeaveRequests,
  cancelLeave,
} = require('../controllers/leave.controller');

router.get('/balances', verifyToken, getLeaveBalances);
router.post('/requests', verifyToken, requestLeave);
router.get('/requests', verifyToken, getLeaveRequests);
router.put('/requests/:reqId/cancel', verifyToken, cancelLeave);

module.exports = router;
