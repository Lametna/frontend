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

const SpyGameEngine = React.lazy(() => import('../spy/SpyGameEngine'));
const TriviaGameEngine = React.lazy(() => import('../trivia/TriviaGameEngine'));
const BingoGameEngine = React.lazy(() => import('../bingo/BingoGameEngine'));
const NumberGuessingEngine = React.lazy(() => import('../number-guessing/NumberGuessingEngine'));

const BusCompleteEngine = React.lazy(() => import('../bus-complete/BusCompleteEngine'));
const DrawGuessEngine = React.lazy(() => import('../draw-guess/DrawGuessEngine'));
const CharadesEngine = React.lazy(() => import('../charades/CharadesEngine'));
const PasswordEngine = React.lazy(() => import('../password/PasswordEngine'));
const TabooEngine = React.lazy(() => import('../taboo/TabooEngine'));

const MafiaEngine = React.lazy(() => import('../social-deduction/MafiaEngine'));
const WerewolfEngine = React.lazy(() => import('../social-deduction/WerewolfEngine'));
const MemoryMatchEngine = React.lazy(() => import('../memory/MemoryMatchEngine'));
const SpotDifferenceEngine = React.lazy(() => import('../spot-difference/SpotDifferenceEngine'));
const WordChainEngine = React.lazy(() => import('../word-chain/WordChainEngine'));
const HangmanEngine = React.lazy(() => import('../hangman/HangmanEngine'));
const CategoriesEngine = React.lazy(() => import('../categories/CategoriesEngine'));

export function GameplayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { phase, setPhase, leaveGame } = useGameFlowStore();
  
  const game = MOCK_GAMES.find(g => g.id === id) || MOCK_GAMES[0];
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (phase === 'idle' || phase === 'readyCheck' || phase === 'lobby') {
      setPhase('loading');
    }
  }, [phase, setPhase]);

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
        <div className="relative w-full h-full flex flex-col bg-background">
          <div className="absolute inset-0 z-0">
             {game.title.includes('Spyfall') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><SpyGameEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Quiz Arena') || game.title.includes('Trivia') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><TriviaGameEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Bingo Night') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><BingoGameEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Riddle') || game.title.includes('Number') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><NumberGuessingEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Word Chase') || game.title.includes('Bus') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><BusCompleteEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Draw & Guess') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><DrawGuessEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Charades') || game.title.includes('Dabke') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><CharadesEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Password') || game.title.includes('Secret') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><PasswordEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Taboo') || game.title.includes('Forbidden') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><TabooEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Mafia') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><MafiaEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Werewolf') || game.title.includes('Ludo') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><WerewolfEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Memory Match') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><MemoryMatchEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Spot') || game.title.includes('Difference') || game.title.includes('Tarneeb') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><SpotDifferenceEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Word Chain') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><WordChainEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Hangman') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><HangmanEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : game.title.includes('Categories') || game.title.includes('Bidaai') ? (
               <React.Suspense fallback={<LoadingScreen game={game} onComplete={() => {}} />}><CategoriesEngine matchId={id!} onFinish={handleFinishMatch} /></React.Suspense>
             ) : (
               <>
                 <video src={game.heroVideo} autoPlay muted loop className="w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-black/20" />
               </>
             )}
          </div>
          
          {/* Minimal Game HUD */}
          <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none">
            <div className="flex gap-2"></div>
            <div className="flex gap-2"></div>
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
