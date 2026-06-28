import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';
import { AlertOctagon } from 'lucide-react';

export default function TabooEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const hitBuzzer = () => {
    audioManager.play('error');
    // Implement screen shake animation locally
    const container = document.getElementById('taboo-container');
    if (container) {
      container.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
      ], { duration: 400 });
    }
  };

  return (
    <div id="taboo-container" className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 to-rose-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Taboo Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-xl px-4">
            
            <div className="w-full flex justify-between items-center mb-6">
              <div className="bg-card px-6 py-2 rounded-xl border text-xl font-bold">Team 1: 5</div>
              <div className="bg-card px-6 py-2 rounded-xl border text-xl font-bold text-red-500 animate-pulse">00:45</div>
              <div className="bg-card px-6 py-2 rounded-xl border text-xl font-bold">Team 2: 3</div>
            </div>

            <PopScale className="w-full bg-card rounded-3xl border shadow-2xl overflow-hidden mb-6">
               <div className="bg-primary p-6 text-center text-primary-foreground">
                 <h1 className="text-5xl font-black uppercase tracking-tight">Smartphone</h1>
               </div>
               <div className="p-6 flex flex-col items-center gap-3 bg-secondary/30">
                 {['Apple', 'Screen', 'Call', 'Internet', 'App'].map((word, i) => (
                   <div key={i} className="text-2xl font-bold text-destructive uppercase tracking-widest">{word}</div>
                 ))}
               </div>
            </PopScale>

            <div className="w-full flex gap-4">
              <Button variant="outline" size="lg" className="flex-1 h-20 text-xl font-bold" onClick={onFinish}>Skip</Button>
              <Button variant="default" size="lg" className="flex-1 h-20 text-xl font-bold bg-green-600 hover:bg-green-700">Correct (+1)</Button>
            </div>

            <div className="absolute top-1/2 -right-24 transform -translate-y-1/2 z-50">
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={hitBuzzer}
                 className="w-48 h-48 bg-red-600 rounded-full border-8 border-red-900 shadow-[0_0_50px_rgba(220,38,38,0.6)] flex items-center justify-center -translate-x-1/2"
               >
                 <AlertOctagon className="w-24 h-24 text-white drop-shadow-lg" />
               </motion.button>
            </div>

          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
