import React, { useState } from "react";
import knowledgeBase from "../data/knowledgeBase";
import Fuse from "fuse.js";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I am your College ERP Assistant. Ask me anything." }
  ]);
  const [input, setInput] = useState("");

  const fuse = new Fuse(knowledgeBase, {
    keys: ["question"],
    threshold: 0.4
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // 1️⃣ Check knowledge base
    const result = fuse.search(input);
    let botReply;

    if (result.length > 0) {
      botReply = result[0].item.answer;
    } else {
      // 2️⃣ Call backend for AI reply
      try {
        const res = await axios.post("http://localhost:5000/api/chat", {
          message: input,
        });
        botReply = res.data.reply;
      } catch (error) {
        botReply = "⚠️ AI not available right now. Please try again later.";
      }
    }

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white border rounded-lg shadow-lg">
      <div className="p-3 bg-blue-600 text-white font-bold rounded-t-lg">ERP Chatbot</div>
      <div className="h-64 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t">
        <input
          type="text"
          className="flex-1 border rounded-l-md p-2 text-sm"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-3 rounded-r-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
