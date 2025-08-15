// src/api.js
export const api = {
  getConversations: async () => {
    const res = await fetch('/chat/conversations');
    if (!res.ok) throw new Error('Failed to fetch conversations');
    return res.json();
  },

  createConversation: async (title = 'New Chat') => {
    const res = await fetch('/chat/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error('Failed to create conversation');
    return res.json();
  },

  getMessages: async (conversationId) => {
    const res = await fetch(`/chat/messages/${conversationId}`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  sendMessage: async (conversationId, text) => {
    const res = await fetch(`/chat/messages/${conversationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  }
};
