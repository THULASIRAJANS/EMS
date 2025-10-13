const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  description: { type: String },
  requirements: [String], // array of skills or qualifications
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
});

module.exports = mongoose.model('Job', jobSchema);
