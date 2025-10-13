const Attendance = require('../models/mysql/attendance.model');

// ✅ Create Attendance
const createAttendance = (req, res) => {
  const newAtt = req.body;
  Attendance.create(newAtt, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: 'Attendance added successfully!', id: result.insertId });
  });
};

// ✅ Get All Attendance
const getAllAttendance = (req, res) => {
  Attendance.findAll((err, records) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(records);
  });
};

// ✅ Get Attendance by Employee ID
const getAttendanceByEmployeeId = (req, res) => {
  const { employee_id } = req.params;
  Attendance.findByEmployeeId(employee_id, (err, records) => {
    if (err) return res.status(500).json({ error: err.message });
    if (records.length === 0)
      return res.status(404).json({ message: 'No attendance found' });
    res.json(records);
  });
};

// ✅ Update Attendance
const updateAttendance = (req, res) => {
  const { id } = req.params;
  const att = req.body;
  Attendance.update(id, att, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Attendance updated successfully' });
  });
};

// ✅ Delete Attendance
const deleteAttendance = (req, res) => {
  const { id } = req.params;
  Attendance.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Attendance deleted successfully' });
  });
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceByEmployeeId,
  updateAttendance,
  deleteAttendance,
};
