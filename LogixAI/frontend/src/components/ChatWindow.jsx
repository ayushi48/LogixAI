// src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ conversation, messages, onSend }) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    await onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-white flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {conversation?.title || "New Chat"}
          </h3>
          <div className="text-xs text-gray-500">
            {conversation?._id
              ? `Conversation ID: ${conversation._id}`
              : "Unsaved"}
          </div>
        </div>
        <div className="text-sm text-gray-500">Model: Gemini-like</div>
      </div>

      {/* Messages */}
      <div className="p-6 flex-1 overflow-auto bg-[#f7f7f8]">
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m._id || m.id} className="flex">
              <MessageBubble
                sender={m.sender || (m.question ? "user" : "ai")}
                text={m.question || m.answer || m.text}
                createdAt={m.createdAt}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Shift+Enter for newline)"
          className="w-full border rounded p-3 h-24 resize-none focus:outline-none focus:ring"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">Press Enter to send</div>
          <div className="space-x-2">
            <button
              onClick={() => setText("")}
              className="px-3 py-1 border rounded text-sm"
            >
              Clear
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
