import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function PasswordEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-black z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Password Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-3xl px-4">
            
            <div className="w-full bg-card p-8 rounded-3xl border shadow-2xl flex flex-col items-center mb-8 relative">
               <h3 className="text-lg text-muted-foreground uppercase tracking-widest mb-2">Secret Word</h3>
               <h1 className="text-5xl font-black text-emerald-500 text-glow">Astronaut</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mb-8">
               <div className="bg-secondary/50 p-6 rounded-2xl flex flex-col">
                 <span className="text-sm text-muted-foreground uppercase font-bold mb-2">Clues Given</span>
                 <div className="text-2xl font-bold">1. Space</div>
                 <div className="text-2xl font-bold">2. Suit</div>
               </div>
               <div className="bg-secondary/50 p-6 rounded-2xl flex flex-col">
                 <span className="text-sm text-muted-foreground uppercase font-bold mb-2">Guesses</span>
                 <div className="text-2xl font-bold text-destructive line-through">Alien</div>
               </div>
            </div>

            <div className="w-full flex gap-4">
               <input type="text" className="flex-1 bg-card border-2 border-primary rounded-2xl px-6 text-2xl outline-none" placeholder="Enter one-word clue..." />
               <Button size="lg" className="h-16 px-8 text-xl" onClick={onFinish}>Submit Clue</Button>
            </div>

          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
