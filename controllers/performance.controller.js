const Performance = require('../models/mysql/performance.model');

// ✅ Create
const createPerformance = (req, res) => {
  const newPerf = req.body;

  Performance.create(newPerf, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({
        message: 'Performance record created successfully!',
        id: result.insertId,
      });
  });
};

// ✅ Get all
const getAllPerformances = (req, res) => {
  Performance.findAll((err, records) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(records);
  });
};

// ✅ Get by employee_id
const getPerformanceByEmployeeId = (req, res) => {
  const { employee_id } = req.params;
  Performance.findByEmployeeId(employee_id, (err, records) => {
    if (err) return res.status(500).json({ error: err.message });
    if (records.length === 0)
      return res.status(404).json({ message: 'No performance record found' });
    res.json(records);
  });
};

// ✅ Update
const updatePerformance = (req, res) => {
  const { id } = req.params;
  const perf = req.body;

  Performance.update(id, perf, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Performance record not found' });
    res.json({ message: 'Performance updated successfully' });
  });
};

// ✅ Delete
const deletePerformance = (req, res) => {
  const { id } = req.params;

  Performance.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Performance record not found' });
    res.json({ message: 'Performance deleted successfully' });
  });
};

module.exports = {
  createPerformance,
  getAllPerformances,
  getPerformanceByEmployeeId,
  updatePerformance,
  deletePerformance,
};
