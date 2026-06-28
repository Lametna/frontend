import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trophy, Users, MessageSquare, AlertCircle, Check, Trash2, Hash } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../lib/mock-data';
import type { Notification } from '../../lib/mock-data';
import { Button } from '../ui/button';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS.slice(0, 10)); // Just 10 for dropdown
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filtered = filter === 'all' ? notifications : notifications.filter(n => !n.isRead);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'social': return <Users className="w-5 h-5 text-blue-500" />;
      case 'party': return <Hash className="w-5 h-5 text-accent" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'system': return <AlertCircle className="w-5 h-5 text-destructive" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose}></div>
          <motion.div 
            className="absolute top-16 right-4 w-80 sm:w-96 bg-card border shadow-xl rounded-2xl overflow-hidden z-50 flex flex-col max-h-[80vh]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="p-4 border-b bg-card/80 backdrop-blur flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" /> Notifications 
                {unreadCount > 0 && <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
              </h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleMarkAllRead} title="Mark all as read">
                  <Check className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" title="Clear all">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="flex border-b bg-card/50">
              <button 
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${filter === 'all' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${filter === 'unread' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[400px]">
              {filtered.length > 0 ? (
                <div className="divide-y divide-border/50">
                  {filtered.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-4 flex gap-3 hover:bg-secondary/50 cursor-pointer transition-colors relative ${!notif.isRead ? 'bg-primary/5' : ''}`}
                      onClick={() => {
                        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
                      }}
                    >
                      {!notif.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                      <div className="mt-1 shrink-0 bg-background rounded-full p-2 border shadow-sm">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notif.isRead ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>{notif.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-snug">{notif.description}</p>
                        <p className="text-xs text-muted-foreground mt-2 opacity-70">
                          {new Date(notif.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground flex flex-col items-center">
                  <Bell className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-medium">You're all caught up!</p>
                  <p className="text-sm mt-1">No new notifications.</p>
                </div>
              )}
            </div>
            
            <div className="p-2 border-t bg-card/80 text-center">
              <Button variant="ghost" className="w-full text-primary h-8 text-xs">View All Settings</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
