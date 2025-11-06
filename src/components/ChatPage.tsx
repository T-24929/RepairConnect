import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Mechanic } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatPageProps {
  mechanic: Mechanic;
  onBack: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'mechanic';
  text: string;
  timestamp: Date;
  image?: string;
}

export default function ChatPage({ mechanic, onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mechanic',
      text: `Hi! I'm on my way to your location. Should arrive in about 15 minutes.`,
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: '2',
      sender: 'user',
      text: 'Great! Looking forward to it.',
      timestamp: new Date(Date.now() - 540000)
    },
    {
      id: '3',
      sender: 'mechanic',
      text: 'Do you have the vehicle registration ready? It will speed up the process.',
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage,
        timestamp: new Date()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate mechanic response
      setTimeout(() => {
        const responses = [
          'Got it, thanks!',
          'Perfect, see you soon!',
          'Understood. I\'ll be there shortly.',
          'Great! Let me know if you need anything else.'
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'mechanic',
          text: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <ImageWithFallback
              src={mechanic.image}
              alt={mechanic.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <h2 className="text-lg">{mechanic.name}</h2>
              <p className="text-sm text-gray-600">{mechanic.specialty}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end gap-2 max-w-[70%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  {message.sender === 'mechanic' && (
                    <ImageWithFallback
                      src={mechanic.image}
                      alt={mechanic.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  
                  <div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white border border-gray-200 rounded-bl-sm'
                    }`}>
                      {message.image && (
                        <ImageWithFallback
                          src={message.image}
                          alt="Attachment"
                          className="w-full rounded-lg mb-2"
                        />
                      )}
                      <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                        {message.text}
                      </p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Quick Replies */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setNewMessage('How much longer until you arrive?')}
              className="px-4 py-2 bg-white rounded-full text-sm whitespace-nowrap hover:bg-gray-50 transition-colors border border-gray-200"
            >
              ETA?
            </button>
            <button
              onClick={() => setNewMessage('Yes, I have everything ready.')}
              className="px-4 py-2 bg-white rounded-full text-sm whitespace-nowrap hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Ready ✓
            </button>
            <button
              onClick={() => setNewMessage('Can you call me when you arrive?')}
              className="px-4 py-2 bg-white rounded-full text-sm whitespace-nowrap hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Call me
            </button>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-end gap-3">
            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
              <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-3 rounded-full h-12 w-12 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            💬 Messages are end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
