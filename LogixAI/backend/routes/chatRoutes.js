const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const {
  createConversation,
  getConversations,
  getMessages,
  sendMessage
} = require('../controllers/chatController');

router.use(authMiddleware);

router.post('/conversations', createConversation);
router.get('/conversations', getConversations);
router.get('/messages/:id', getMessages);
router.post('/messages/:id', sendMessage);

module.exports = router;
