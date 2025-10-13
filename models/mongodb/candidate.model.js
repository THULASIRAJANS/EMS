const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  resumeUrl: { type: String }, // path to uploaded resume
  skills: [String], // extracted skills
  experience: Number, // years of experience
  status: {
    type: String,
    enum: ['Applied', 'Screened', 'Interviewed', 'Hired', 'Rejected'],
    default: 'Applied',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Candidate', candidateSchema);
