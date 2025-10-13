const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
  messages: [
    {
      sender: { type: String, enum: ['AI','Candidate'], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Conversation', conversationSchema);
