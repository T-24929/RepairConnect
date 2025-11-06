import { ArrowLeft, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

interface ChatInterfaceProps {
  bookingId: string;
  mechanicName: string;
  onClose: () => void;
}

export function ChatInterface({ bookingId, mechanicName, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3fbde8b/chat/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;
    
    setSending(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d3fbde8b/chat/${bookingId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: newMessage,
            sender: 'user'
          })
        }
      );
      
      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2>Chat with {mechanicName}</h2>
          <p className="text-sm text-gray-600">Usually replies instantly</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>No messages yet</p>
              <p className="text-sm">Start a conversation with your mechanic</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={msg.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-4 shrink-0">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={sending}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-blue-500 hover:bg-blue-600 shrink-0"
            disabled={sending || !newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
