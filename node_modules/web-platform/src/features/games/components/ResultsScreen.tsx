import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Home, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import { XPBar } from './XPBar';
import { triggerVictoryConfetti } from '../../../components/ui/confetti';
import { CURRENT_USER } from '../../../lib/mock-data';
import { audioManager } from '../../../lib/audio';
import { useNavigate } from 'react-router';

interface ResultsScreenProps {
  onReturn: () => void;
}

export function ResultsScreen({ onReturn }: ResultsScreenProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti immediately on mount
    triggerVictoryConfetti();
    audioManager.play('victory');
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl p-4 overflow-y-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Victory Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-yellow-500/20 border-4 border-yellow-500 shadow-[0_0_50px_rgba(234,179,8,0.4)] mb-6 text-yellow-500">
            <Trophy className="w-12 h-12" />
          </div>
          <h1 className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm mb-2">
            VICTORY
          </h1>
          <p className="text-xl text-muted-foreground">Match finished in 14:22</p>
        </motion.div>

        {/* Player Stats Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-card rounded-3xl border shadow-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary shadow-xl">
                <AvatarImage src={CURRENT_USER.avatar} />
              </Avatar>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-yellow-950 px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 border-2 border-card">
                <Star className="w-3 h-3 fill-current" /> MVP
              </div>
            </div>
            
            <div className="flex-1 w-full text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{CURRENT_USER.username}</h2>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-secondary/50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">Score</p>
                  <p className="text-2xl font-bold text-primary">12,450</p>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-accent">94%</p>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-4 text-center">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">Coins</p>
                  <p className="text-2xl font-bold text-yellow-500">+450</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <XPBar currentXP={CURRENT_USER.xp + 2500} maxXP={CURRENT_USER.xp + 5000} level={CURRENT_USER.level} animateFrom={CURRENT_USER.xp} />
            <p className="text-center text-sm text-muted-foreground mt-3">+2,500 XP Earned</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 w-full"
        >
          <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold shadow-lg" onClick={onReturn}>
            <RotateCcw className="w-5 h-5 mr-2" /> Play Again
          </Button>
          <Button size="lg" variant="secondary" className="h-14 px-8 rounded-2xl text-lg" onClick={() => navigate('/games')}>
            <Home className="w-5 h-5 mr-2" /> Return to Library
          </Button>
        </motion.div>

      </div>
    </motion.div>
  );
}
