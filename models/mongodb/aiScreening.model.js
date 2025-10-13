const mongoose = require('mongoose');

const aiScreeningSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  score: { type: Number, required: true }, // AI screening score
  feedback: { type: String }, // optional AI comments
  skillsMatched: [String], // skills matched by AI
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AIScreening', aiScreeningSchema);
