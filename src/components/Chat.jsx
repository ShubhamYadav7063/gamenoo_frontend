import { useState, useRef, useEffect } from "react";

function Chat({ messages, onSendMessage, username, roomName }) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col p-4 rounded-lg shadow bg-card h-80">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Chat</h3>
        <span className="text-sm text-gray-600">Room: {roomName}</span>
      </div>

      <div className="flex-1 mb-2 overflow-y-auto">
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-full break-words ${
                msg.sender === username
                  ? "bg-primary/10 ml-auto"
                  : "bg-gray-100"
              }`}
            >
              <div className="text-xs font-bold">{msg.sender}</div>
              <div>{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 text-white transition rounded-md bg-primary hover:bg-primary/90"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
