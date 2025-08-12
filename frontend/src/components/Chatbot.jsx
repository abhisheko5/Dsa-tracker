
import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you with DSA today?" }
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: "bot", text: "(AI response coming soon...)" }
      ]);
    }, 700);
  };

  if (!open) {
    return (
      <button
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl font-bold hover:bg-indigo-700 transition"
        onClick={() => setOpen(true)}
        aria-label="Open chatbot"
      >
        💬
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 w-72 max-w-full bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
      <div className="bg-indigo-600 text-white px-4 py-2 rounded-t-2xl font-bold text-base flex items-center justify-between">
        <span>DSA Chatbot</span>
        <button
          className="ml-2 text-white text-lg font-bold hover:text-gray-200 transition"
          onClick={() => setOpen(false)}
          aria-label="Minimize chatbot"
        >
          &minus;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 h-60 flex flex-col gap-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
            <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${msg.sender === "bot" ? "bg-indigo-100 text-indigo-800" : "bg-indigo-600 text-white"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 p-2 border-t bg-white">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button
          className="px-3 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
