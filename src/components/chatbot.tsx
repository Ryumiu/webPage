import React, { useState } from 'react';
import './chatbot.css';

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      text: inputText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);

    // Simular respuesta del bot
    const botResponse: Message = {
      text: 'Gracias por tu mensaje. Pronto un miembro de nuestro equipo se pondrá en contacto contigo.',
      isUser: false
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Chat con Mundo Animal</h3>
          </div>

          <div className="messages-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;