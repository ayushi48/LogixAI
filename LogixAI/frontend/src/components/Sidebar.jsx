// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ conversations, selectedId, onSelect, onNew }) {
  return (
    <aside className="w-80 bg-gray-900 text-gray-100 p-4 flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button onClick={onNew} className="text-sm px-2 py-1 bg-green-600 rounded">
          New
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-2">
        {conversations.length === 0 && (
          <div className="text-sm text-gray-400">No conversations yet. Click New to start.</div>
        )}
        {conversations.map((c) => (
          <div
            key={c._id || c.id}
            onClick={() => onSelect(c)}
            className={`p-3 rounded cursor-pointer hover:bg-gray-800 ${
              selectedId === (c._id || c.id) ? "bg-gray-800" : ""
            }`}
          >
            <div className="font-medium truncate">{c.title || "New Chat"}</div>
            <div className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        Logged in — Conversations are stored on server.
      </div>
    </aside>
  );
}
