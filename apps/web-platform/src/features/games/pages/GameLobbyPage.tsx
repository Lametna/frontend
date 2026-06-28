import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { UsersRound, Settings, Share2, Volume2, MicOff, MessageSquare, X, Star, Trophy } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { MOCK_GAMES, EXTENDED_USERS } from '../../../lib/mock-data';
import { useGameFlowStore } from '../../../store/gameFlow';

export function GameLobbyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setPhase } = useGameFlowStore();
  
  const game = MOCK_GAMES.find(g => g.id === id) || MOCK_GAMES[0];
  const [isReady] = useState(false);
  const [showReadyCheck, setShowReadyCheck] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Mock Players in Lobby
  const players = [
    { ...EXTENDED_USERS[0], isHost: true, isReady: true, isSpeaking: false },
    { ...EXTENDED_USERS[1], isHost: false, isReady: isReady, isSpeaking: true },
    { ...EXTENDED_USERS[2], isHost: false, isReady: true, isSpeaking: false },
    { ...EXTENDED_USERS[3], isHost: false, isReady: false, isSpeaking: false },
  ];

  // Simulated Ready Check flow
  useEffect(() => {
    if (showReadyCheck) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Transition to Loading Screen
        navigate(`/games/${game.id}/play`);
      }
    }
  }, [showReadyCheck, countdown, navigate, game.id]);

  const handleStartMatch = () => {
    setShowReadyCheck(true);
    setPhase('readyCheck');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] -mt-8 -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] flex flex-col bg-background animate-fade-in">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={game.bannerImage} className="w-full h-full object-cover opacity-20 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 flex items-center justify-between border-b bg-background/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><X className="w-6 h-6" /></Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Matchmaking Lobby <Badge className="bg-primary/20 text-primary border-none">Public</Badge>
            </h1>
            <p className="text-sm text-muted-foreground">{game.title} • Ranked Match</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Share2 className="w-4 h-4"/> Invite</Button>
          <Button variant="outline" className="gap-2"><Settings className="w-4 h-4"/> Match Settings</Button>
        </div>
      </div>

      {/* Main Lobby Area */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row p-6 gap-6">
        
        {/* Left Column: Players */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-lg font-bold flex items-center gap-2"><UsersRound className="w-5 h-5 text-primary"/> Team Alpha</h2>
            <span className="text-sm text-muted-foreground">4 / {game.playerCount.max} Players</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.map((player) => (
              <motion.div 
                key={player.id} 
                className="relative bg-card rounded-2xl border p-4 flex items-center gap-4 overflow-hidden group shadow-sm"
                whileHover={{ y: -2 }}
              >
                {/* Voice Indicator Background */}
                {player.isSpeaking && <div className="absolute inset-0 bg-green-500/5 animate-pulse" />}
                
                <div className="relative">
                  <Avatar className={`w-14 h-14 border-2 ${player.isSpeaking ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'border-transparent'}`}>
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback>{player.username[0]}</AvatarFallback>
                  </Avatar>
                  {player.isHost && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-yellow-950 rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg truncate group-hover:text-primary transition-colors">{player.username}</p>
                  <p className="text-xs text-muted-foreground">Level {player.level}</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {player.isReady ? (
                     <Badge className="bg-primary/20 text-primary border-none shadow-inner text-xs px-2 py-0.5">READY</Badge>
                  ) : (
                     <Badge variant="outline" className="text-muted-foreground border-dashed text-xs px-2 py-0.5">NOT READY</Badge>
                  )}
                  {player.isSpeaking ? <Volume2 className="w-4 h-4 text-green-500" /> : <MicOff className="w-4 h-4 text-muted-foreground opacity-50" />}
                </div>
              </motion.div>
            ))}
            
            {/* Empty Slots */}
            {Array.from({ length: 4 }).map((_, i) => (
               <div key={`empty_${i}`} className="bg-card/50 border border-dashed rounded-2xl p-4 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                 <div className="flex flex-col items-center gap-2 text-muted-foreground">
                   <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><Plus className="w-5 h-5"/></div>
                   <span className="text-sm font-medium">Invite Player</span>
                 </div>
               </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat & Config */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          
          {/* Game Config Summary */}
          <div className="bg-card rounded-2xl border shadow-sm p-4">
            <h3 className="font-bold mb-3">Match Configuration</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span className="flex items-center gap-2"><Trophy className="w-4 h-4"/> Difficulty</span><span className="text-foreground">{game.difficulty}</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><Settings className="w-4 h-4"/> Mode</span><span className="text-foreground">Tournament</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><Volume2 className="w-4 h-4"/> Voice Chat</span><span className="text-green-500">Enabled</span></div>
            </div>
          </div>

          {/* Lobby Chat Placeholder */}
          <div className="flex-1 bg-card rounded-2xl border shadow-sm flex flex-col overflow-hidden min-h-[250px]">
             <div className="p-3 border-b flex items-center gap-2 bg-secondary/30">
               <MessageSquare className="w-4 h-4 text-primary" /> <span className="font-bold text-sm">Lobby Chat</span>
             </div>
             <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 justify-end">
               <div className="text-xs text-muted-foreground text-center my-2">System: Welcome to the lobby!</div>
               <div className="text-sm"><span className="font-bold text-primary">Ahmed_Z:</span> Let's win this guys!</div>
               <div className="text-sm"><span className="font-bold text-accent">Sara_99:</span> I am ready when you are.</div>
             </div>
             <div className="p-2 border-t bg-secondary/20">
               <input className="w-full bg-background border rounded-lg px-3 py-2 text-sm" placeholder="Type a message..." />
             </div>
          </div>

          {/* Action Button */}
          <Button 
            size="lg" 
            className={`w-full h-16 rounded-2xl text-xl font-bold shadow-xl transition-all ${isReady ? 'bg-primary shadow-primary/30' : 'bg-secondary text-secondary-foreground hover:bg-primary/20'}`}
            onClick={handleStartMatch}
          >
             {isReady ? 'Start Match' : 'Ready Up'}
          </Button>

        </div>
      </div>

      {/* Ready Check Modal Overlay */}
      <AnimatePresence>
        {showReadyCheck && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-card border rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </div>

              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 relative">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                />
                <span className="text-4xl font-display font-bold text-primary">{countdown}</span>
              </div>
              
              <h2 className="text-3xl font-display font-bold mb-2">Match Found!</h2>
              <p className="text-muted-foreground mb-8">Waiting for other players to connect...</p>
              
              <div className="flex justify-center gap-2 mb-8">
                {players.map(p => (
                  <Avatar key={p.id} className="w-12 h-12 border-2 border-primary shadow-lg shadow-primary/20">
                    <AvatarImage src={p.avatar} />
                  </Avatar>
                ))}
              </div>

              <Button variant="outline" className="w-full text-destructive border-destructive/50 hover:bg-destructive/10" onClick={() => setShowReadyCheck(false)}>
                Cancel Matchmaking
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// A local icon import fix for the empty slots
const Plus = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
