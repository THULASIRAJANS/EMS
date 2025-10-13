const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // could reference employee or user table
  widgets: [
    {
      type: { type: String }, // e.g., 'attendanceChart', 'performanceTable'
      data: mongoose.Schema.Types.Mixed, // flexible field for any type of data
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
