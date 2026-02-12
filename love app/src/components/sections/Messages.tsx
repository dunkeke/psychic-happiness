import { useState, useRef, useEffect } from 'react';
import { Heart, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Message } from '@/types';

interface MessagesProps {
  messages: Message[];
  onAdd: (content: string) => void;
  onLike: (messageId: string) => void;
}

export function Messages({ messages, onAdd, onLike }: MessagesProps) {
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onAdd(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-pink-500" />
            甜蜜留言
          </h3>
          <p className="text-sm text-gray-500 mt-1">写下想对TA说的话</p>
        </div>
      </div>

      {/* Messages List */}
      <div
        ref={scrollRef}
        className="bg-white rounded-2xl shadow-soft p-4 mb-4 h-64 overflow-y-auto space-y-3"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.author === 'me' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                message.author === 'me'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className={`flex items-center justify-between mt-1.5 ${
                message.author === 'me' ? 'text-rose-100' : 'text-gray-400'
              }`}>
                <span className="text-xs opacity-70">
                  {new Date(message.createdAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => onLike(message.id)}
                  className="flex items-center gap-0.5 text-xs hover-scale"
                >
                  <Heart className={`w-3 h-3 ${message.isLiked ? 'fill-current' : ''}`} />
                  {message.likes > 0 && <span>{message.likes}</span>}
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Heart className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">还没有留言，说点什么吧~</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="写下你想说的话..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-white border-rose-100 focus:border-rose-300"
        />
        <Button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Messages */}
      <div className="flex flex-wrap gap-2 mt-3">
        {['想你了 💕', '今天辛苦了 💝', '爱你哟 😘', '晚安好梦 🌙'].map((msg) => (
          <button
            key={msg}
            onClick={() => onAdd(msg)}
            className="px-3 py-1.5 bg-rose-50 text-rose-600 text-sm rounded-full hover:bg-rose-100 transition-colors hover-scale"
          >
            {msg}
          </button>
        ))}
      </div>
    </section>
  );
}
