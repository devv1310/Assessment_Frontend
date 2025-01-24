import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);

    try {
      const response = await axios.post('http://localhost:5000/message', { message });
      const botResponse = response.data.bot_response;

      // Add bot response to chat history
      setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={chat.sender === 'user' ? 'user-message' : 'bot-message'}>
              <p>{chat.text}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
