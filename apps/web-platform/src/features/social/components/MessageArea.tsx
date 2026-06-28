import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip, Mic, Check, CheckCheck } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { MOCK_MESSAGES } from '../../../lib/mock-data';
import type { Conversation, Message, User } from '../../../lib/mock-data';

interface MessageAreaProps {
  conversation: Conversation;
  otherUser: User;
}

export function MessageArea({ conversation, otherUser }: MessageAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages for this conversation
    const convoMessages = MOCK_MESSAGES.filter(m => m.conversationId === conversation.id).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    setMessages(convoMessages);
  }, [conversation.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg: Message = {
      id: `msg_new_${Date.now()}`,
      conversationId: conversation.id,
      senderId: '1', // CURRENT_USER
      text,
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'text'
    };

    setMessages([...messages, newMsg]);
    setText('');
    
    // Simulate other user typing and responding
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `msg_new_${Date.now() + 1}`,
        conversationId: conversation.id,
        senderId: otherUser.id,
        text: 'That sounds great! I am in.',
        timestamp: new Date().toISOString(),
        isRead: true,
        type: 'text'
      }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-card/50 relative overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide" ref={scrollRef}>
        <div className="text-center text-xs text-muted-foreground my-4">Today</div>
        
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isMe = msg.senderId === '1';
            const showAvatar = !isMe && (i === 0 || messages[i-1].senderId === '1');
            
            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {!isMe && (
                  <div className="w-8 shrink-0">
                    {showAvatar && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={otherUser.avatar} />
                        <AvatarFallback>{otherUser.username[0]}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                )}
                
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl ${isMe ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary rounded-tl-sm shadow-sm border border-border/50'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    {isMe && (
                      msg.isRead ? <CheckCheck className="w-3 h-3 text-primary" /> : <Check className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 max-w-[80%]"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={otherUser.avatar} />
            </Avatar>
            <div className="bg-secondary p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border/50 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2 items-end">
          <div className="flex gap-1 shrink-0 pb-2">
            <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground rounded-full"><Paperclip className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground rounded-full"><Smile className="w-4 h-4" /></Button>
          </div>
          <Input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..." 
            className="bg-secondary/50 border-none rounded-2xl h-auto py-3 px-4 resize-none"
          />
          <div className="flex gap-1 shrink-0 pb-1.5">
            {text.trim() ? (
              <Button type="submit" size="icon" className="w-10 h-10 rounded-full shadow-md hover:scale-105 transition-transform bg-primary">
                <Send className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button type="button" size="icon" variant="secondary" className="w-10 h-10 rounded-full">
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
