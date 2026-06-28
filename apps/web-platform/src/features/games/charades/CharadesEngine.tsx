import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function CharadesEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const handleCorrect = () => {
    audioManager.play('success');
    onFinish();
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-black z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Charades Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-2xl px-4">
            
            <div className="flex justify-between w-full items-center mb-12">
               <div className="text-xl font-bold bg-card px-6 py-2 rounded-xl border text-muted-foreground uppercase">Team A Turn</div>
               <div className="text-4xl font-black text-red-500 animate-pulse bg-card px-6 py-2 rounded-xl border">00:15</div>
            </div>

            <PopScale className="bg-card w-full p-16 rounded-[3rem] border shadow-2xl flex flex-col items-center text-center mb-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
               <h3 className="text-2xl text-muted-foreground uppercase tracking-widest mb-4">Act Out:</h3>
               <h1 className="text-7xl font-black text-primary text-glow leading-tight">Spider-Man</h1>
            </PopScale>

            <div className="flex gap-4 w-full">
               <Button variant="destructive" size="lg" className="flex-1 h-16 text-xl">Pass</Button>
               <Button variant="default" size="lg" className="flex-1 h-16 text-xl" onClick={handleCorrect}>Correct!</Button>
            </div>
            
          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
