// src/components/MessageBubble.jsx
import React from "react";

export default function MessageBubble({ sender, text, createdAt }) {
  const isUser = sender === "user" || sender === "me";

  return (
    <div className={`max-w-[70%] ${isUser ? "ml-auto text-right" : ""}`}>
      <div
        className={`inline-block py-2 px-3 rounded-lg whitespace-pre-wrap ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {text}
      </div>
      <div className="text-[10px] text-gray-400 mt-1">
        {new Date(createdAt).toLocaleString()}
      </div>
    </div>
  );
}
