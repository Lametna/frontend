import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import type { Game } from '../../../lib/mock-games';

interface LoadingScreenProps {
  game: Game;
  onComplete: () => void;
}

const TIPS = [
  "Did you know? Playing with friends grants a 15% XP bonus.",
  "Remember to check your daily challenges for extra coins.",
  "Communication is key. Use the voice channel to coordinate.",
  "You can customize your player banner in the Profile section."
];

export function LoadingScreen({ game, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];

  useEffect(() => {
    const duration = 4000; // 4 seconds loading simulation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 500); // Small pause at 100%
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0">
        <img src={game.bannerImage} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-end p-8 md:p-16">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-xl mb-2">{game.title}</h1>
        <p className="text-xl text-white/80 mb-12">Matchmaking complete. Entering the arena...</p>

        <div className="max-w-2xl w-full">
          <div className="flex justify-between items-end mb-3">
            <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 backdrop-blur-md">
              <Info className="w-4 h-4" />
              <span className="text-sm font-bold">Tip: {tip}</span>
            </div>
            <span className="text-2xl font-display font-bold">{Math.floor(progress)}%</span>
          </div>
          
          <div className="h-2 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
            <motion.div 
              className="h-full bg-primary relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white/40 to-transparent blur-sm" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
