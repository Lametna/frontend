import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, MessageSquare, UsersRound, Flag, X, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MOCK_GAMES } from '../../../lib/mock-data';
import { useGameFlowStore } from '../../../store/gameFlow';
import { LoadingScreen } from '../components/LoadingScreen';
import { ResultsScreen } from '../components/ResultsScreen';

export function GameplayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { phase, setPhase, leaveGame } = useGameFlowStore();
  
  const game = MOCK_GAMES.find(g => g.id === id) || MOCK_GAMES[0];
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // When entering this page, if we aren't loading/playing/results, start loading.
    if (phase === 'idle' || phase === 'readyCheck' || phase === 'lobby') {
      setPhase('loading');
    }
  }, [phase, setPhase]);

  // Handle Shift+Tab for overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        setShowOverlay(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFinishMatch = () => {
    setShowOverlay(false);
    setPhase('results');
  };

  const handleReturnToLobby = () => {
    leaveGame();
    navigate(`/games/${game.id}/lobby`);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      
      <AnimatePresence>
        {phase === 'loading' && (
          <LoadingScreen game={game} onComplete={() => setPhase('playing')} />
        )}
      </AnimatePresence>

      {phase === 'playing' && (
        <div className="relative w-full h-full flex flex-col">
          {/* Simulated Game Render View */}
          <div className="absolute inset-0 z-0">
             <video src={game.heroVideo} autoPlay muted loop className="w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* Minimal Game HUD */}
          <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none">
            <div className="flex gap-2">
              <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-xl border flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="font-bold text-sm">Round 3/5</span>
              </div>
            </div>
            
            <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-xl border text-sm font-bold flex flex-col items-center">
              <span className="text-muted-foreground text-xs uppercase">Time Remaining</span>
              <span className="text-xl">04:12</span>
            </div>
            
            <Button variant="secondary" className="pointer-events-auto backdrop-blur bg-background/80" onClick={() => setShowOverlay(!showOverlay)}>
               Shift+Tab Menu
            </Button>
          </div>

          {/* Dev Debug Button to skip to end */}
          <div className="absolute bottom-4 right-4 z-10">
             <Button variant="default" onClick={handleFinishMatch} className="shadow-lg animate-pulse shadow-primary/20">
               [DEV] Trigger Match End
             </Button>
          </div>

          {/* In-Game Overlay */}
          <AnimatePresence>
            {showOverlay && (
              <motion.div 
                className="absolute inset-0 z-50 bg-background/80 backdrop-blur-md flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Overlay Sidebar */}
                <motion.div 
                  className="w-80 h-full bg-card border-r shadow-2xl flex flex-col"
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                >
                  <div className="p-6 border-b flex justify-between items-center bg-card/50">
                    <h2 className="text-2xl font-display font-bold">Lametna UI</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowOverlay(false)}><X className="w-5 h-5"/></Button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                     <Button variant="ghost" className="w-full justify-start h-12 text-md" onClick={() => setShowOverlay(false)}><ArrowRight className="w-5 h-5 mr-3"/> Resume Game</Button>
                     <Button variant="ghost" className="w-full justify-start h-12 text-md"><Settings className="w-5 h-5 mr-3"/> Settings</Button>
                     <Button variant="ghost" className="w-full justify-start h-12 text-md"><UsersRound className="w-5 h-5 mr-3"/> Party & Voice</Button>
                     <Button variant="ghost" className="w-full justify-start h-12 text-md"><MessageSquare className="w-5 h-5 mr-3"/> Messages <Badge className="ml-auto bg-primary text-primary-foreground border-none">2</Badge></Button>
                  </div>

                  <div className="p-4 border-t space-y-2 bg-secondary/10">
                     <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive"><Flag className="w-4 h-4 mr-3"/> Report Issue</Button>
                     <Button variant="destructive" className="w-full" onClick={handleReturnToLobby}>Abandon Match</Button>
                  </div>
                </motion.div>
                
                {/* Click outside to close */}
                <div className="flex-1 cursor-pointer" onClick={() => setShowOverlay(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {phase === 'results' && (
          <ResultsScreen onReturn={handleReturnToLobby} />
        )}
      </AnimatePresence>

    </div>
  );
}
