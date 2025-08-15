const mongoose = require('mongoose');

const chatTurnSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  question: { type: String, required: true },  // User's message
  answer: { type: String, required: true },    // AI's reply
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatTurn', chatTurnSchema);

