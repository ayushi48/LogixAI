// src/App.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { api } from "./api";

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      const convos = await api.getConversations();
      setConversations(convos);
    } catch (err) {
      console.error(err);
    }
  }

  async function createNewConversation() {
    const newConv = await api.createConversation("New Chat");
    setConversations((prev) => [newConv, ...prev]);
    selectConversation(newConv);
  }

  async function selectConversation(conv) {
    setSelectedConversation(conv);
    try {
      const msgs = await api.getMessages(conv._id || conv.id);
      setMessages(msgs);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSend(text) {
    if (!selectedConversation) {
      const newConv = await api.createConversation("Conversation");
      setConversations((prev) => [newConv, ...prev]);
      await selectConversation(newConv);
    }

    const saved = await api.sendMessage(selectedConversation._id, text);
    setMessages((prev) => [...prev, saved]);
    loadConversations();
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar
        conversations={conversations}
        selectedId={selectedConversation?._id}
        onSelect={selectConversation}
        onNew={createNewConversation}
      />
      <main className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            onSend={handleSend}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
              <p className="text-gray-600">
                Select or create a conversation to start chatting with the AI.
              </p>
              <div className="mt-4">
                <button
                  onClick={createNewConversation}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Start a new chat
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
