const Conversation = require('../models/Conversation');
// const Message = require('../models/Message');
const ChatTurn = require('../models/Message');
const { getAIResponse } = require('../services/geminiService');

// Create a new conversation
exports.createConversation = async (req, res) => {
  const conversation = await Conversation.create({ userId: req.userId, title: req.body.title || 'New Chat' });
  res.json(conversation);
};

// Get all conversations for logged-in user
exports.getConversations = async (req, res) => {
  const conversations = await Conversation.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(conversations);
};

// Get messages of a conversation
// exports.getMessages = async (req, res) => {
//   const messages = await ChatTurn.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
//   res.json(messages);
// };


exports.getMessages = async (req, res) => {
  try {
    const turns = await ChatTurn.find({ conversationId: req.params.id })
      .sort({ createdAt: 1 });
    res.json(turns);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Send a message & get AI response
// exports.sendMessage = async (req, res) => {
//   const { text } = req.body;
//   const conversationId = req.params.id;

//   // Save user message
//   await Message.create({ conversationId, sender: 'user', text });

//   // Get AI reply
//   const aiReply = await getAIResponse(text);

//   // Save AI message
//   await Message.create({ conversationId, sender: 'ai', text: aiReply });

//   res.json({ user: text, ai: aiReply });
// };


// Send a message & get AI response
exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const conversationId = req.params.id;

    // Get AI reply
    const aiReply = await getAIResponse(text);

    // Save user question & AI reply in one document
    const savedMessage = await ChatTurn.create({
      conversationId,
      question: text,
      answer: aiReply
    });

    res.json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
