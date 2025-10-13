const express = require('express');
const router = express.Router();
const {
  createAttendance,
  getAllAttendance,
  getAttendanceByEmployeeId,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendance.controller');

router.post('/', createAttendance);
router.get('/', getAllAttendance);
router.get('/:employee_id', getAttendanceByEmployeeId);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
