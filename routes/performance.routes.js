const express = require('express');
const router = express.Router();
const {
  createPerformance,
  getAllPerformances,
  getPerformanceByEmployeeId,
  updatePerformance,
  deletePerformance
} = require('../controllers/performance.controller');

router.post('/', createPerformance);
router.get('/', getAllPerformances);
router.get('/:employee_id', getPerformanceByEmployeeId);
router.put('/:id', updatePerformance);
router.delete('/:id', deletePerformance);

module.exports = router;
