import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Hash, Gamepad2, X, Clock, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { EXTENDED_USERS, MOCK_GAMES, MOCK_COMMUNITIES } from '../../lib/mock-data';
import { Badge } from '../ui/badge';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const searchResults = {
    users: EXTENDED_USERS.filter(u => u.username.toLowerCase().includes(query.toLowerCase())).slice(0, 3),
    games: MOCK_GAMES.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 2),
    communities: MOCK_COMMUNITIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2),
  };

  const hasResults = query && (searchResults.users.length > 0 || searchResults.games.length > 0 || searchResults.communities.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-0">
          <motion.div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="relative w-full max-w-2xl bg-card border shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center px-4 py-3 border-b bg-card/50">
              <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                placeholder="Search games, friends, communities..."
              />
              <button onClick={onClose} className="p-1 rounded-md hover:bg-secondary text-muted-foreground transition-colors shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 scrollbar-hide flex-1">
              {!query ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Searches</h4>
                    <div className="space-y-1">
                      {['Tarneeb Masters', 'Ahmed_Z', 'Cairo Drift Club'].map((q, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors group">
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{q}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Suggested</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground"><Gamepad2 className="w-3 h-3 mr-1"/> Action Games</Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground"><Hash className="w-3 h-3 mr-1"/> Tournaments</Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground"><User className="w-3 h-3 mr-1"/> Find Friends</Badge>
                    </div>
                  </div>
                </div>
              ) : hasResults ? (
                <div className="space-y-6">
                  {searchResults.users.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">People</h4>
                      <div className="space-y-1">
                        {searchResults.users.map(user => (
                          <div key={user.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{user.username}</p>
                              {user.richPresence && <p className="text-xs text-muted-foreground truncate">{user.richPresence}</p>}
                            </div>
                            {user.status !== 'offline' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.games.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Games</h4>
                      <div className="space-y-1">
                        {searchResults.games.map(game => (
                          <div key={game.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors">
                            <img src={game.coverImage} className="w-10 h-10 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{game.title}</p>
                              <p className="text-xs text-muted-foreground">{game.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.communities.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Communities</h4>
                      <div className="space-y-1">
                        {searchResults.communities.map(comm => (
                          <div key={comm.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-accent to-orange-400 flex items-center justify-center text-white">
                              <Hash className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{comm.name}</p>
                              <p className="text-xs text-muted-foreground">{comm.memberCount.toLocaleString()} Members</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">No results found</p>
                  <p className="text-sm">Try searching for something else.</p>
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t bg-secondary/50 text-xs text-muted-foreground flex justify-between items-center">
              <span>Use <kbd className="px-1.5 py-0.5 rounded bg-background border shadow-sm mx-1">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-background border shadow-sm mx-1">↓</kbd> to navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-background border shadow-sm mx-1">ESC</kbd> to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
