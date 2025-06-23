import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';

interface Message {
  text: string;
  isUser: boolean;
}

interface AutoResponse {
  keywords: string[];
  response: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Respuestas automáticas predefinidas
  const autoResponses: AutoResponse[] = [
    {
      keywords: ['servicio', 'servicios', 'ofrecen', 'tienen'],
      response: `Nuestros servicios principales incluyen:
- Consulta veterinaria general
- Vacunación completa
- Desparasitación
- Cirugías menores y mayores
- Limpieza dental
- Peluquería canina
- Hospitalización
- Emergencias 24/7
¿Te gustaría saber más sobre algún servicio en particular?`
    },
    {
      keywords: ['precio', 'precios', 'costo', 'costos', 'valor', 'cuanto', 'cuánto'],
      response: `Aquí están nuestros precios referenciales en bolivianos:
- Consulta básica: 100 Bs
- Control rutinario: 80 Bs
- Vacunas: desde 150 Bs
- Desparasitación: desde 80 Bs
- Peluquería: desde 80 Bs
- Cirugías menores: desde 500 Bs
- Cirugías mayores: desde 1000 Bs
- Limpieza dental: 250 Bs
- Hospitalización: 200 Bs por día
Los precios pueden variar según el caso específico.`
    },
    {
      keywords: ['horario', 'atienden', 'abierto', 'hora'],
      response: 'Nuestro horario de atención es de lunes a viernes de 8:00 AM a 7:00 PM y sábados de 9:00 AM a 2:00 PM. Para emergencias contamos con servicio 24/7.'
    },
    {
      keywords: ['emergencia', 'urgencia', 'urgente'],
      response: 'Contamos con servicio de emergencias las 24 horas. En caso de emergencia fuera del horario regular, por favor llamar al número de guardia: 70XXXXXX.'
    },
    {
      keywords: ['ubicación', 'dirección', 'donde', 'dónde', 'llegar'],
      response: 'Estamos ubicados en [Dirección de la veterinaria]. Puedes encontrarnos fácilmente en Google Maps como "Mundo Animal".'
    }
  ];

  // Función para verificar respuestas automáticas
  const checkAutoResponse = (text: string): string | null => {
    const lowercaseText = text.toLowerCase();
    for (const autoResponse of autoResponses) {
      if (autoResponse.keywords.some(keyword => lowercaseText.includes(keyword))) {
        return autoResponse.response;
      }
    }
    return null;
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          text: '¡Hola! Soy el asistente virtual de Mundo Animal. Puedo ayudarte con información sobre nuestros servicios, precios, horarios y más. ¿En qué puedo ayudarte?',
          isUser: false,
        },
      ]);
    }
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const userMessage: Message = {
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Verificar si hay una respuesta automática
    const autoResponse = checkAutoResponse(inputText);

    if (autoResponse) {
      // Si hay una respuesta automática, usarla
      setTimeout(() => {
        const botMessage: Message = {
          text: autoResponse,
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000); // Pequeño delay para simular procesamiento
    } else {
      // Si no hay respuesta automática, usar Ollama
      try {
        const response = await fetch('http://localhost:3000/ollama-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: inputText }),
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        const botMessage: Message = {
          text: data.response || 'Lo siento, no pude procesar tu solicitud en este momento.',
          isUser: false,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = {
          text: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo más tarde.',
          isUser: false,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };
// Justo antes del return (
const toggleChat = () => {
  setIsOpen(!isOpen);
};
  // ... resto del código del componente se mantiene igual ...
  return (
    <div className="chatbot-container">
      <button 
        className="chat-toggle" 
        onClick={toggleChat}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
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
                <span className="message-icon">
                  {message.isUser ? '👤' : '🐾'}
                </span>
                <div className="message-text">{message.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message loading">
                <span className="message-icon">🐾</span>
                <div className="message-text">
                  <span className="typing-indicator">Escribiendo</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Pregunta sobre servicios, precios..."
              disabled={isLoading}
              rows={1}
              className="chat-input"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isLoading || inputText.trim() === ''}
              className="send-button"
            >
              {isLoading ? '...' : '📤'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;