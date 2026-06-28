import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function BingoGameEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const [marked, setMarked] = useState<Set<number>>(new Set());

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const toggleMark = (index: number) => {
    audioManager.play('click');
    setMarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const callBingo = () => {
    audioManager.play('victory');
    onFinish();
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Bingo Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <FadeIn key="playing" className="z-10 flex flex-col items-center w-full max-w-2xl px-4">
            
            <div className="flex justify-between w-full mb-8 items-end">
              <div className="bg-card px-6 py-4 rounded-2xl border flex flex-col items-center">
                <span className="text-muted-foreground text-sm uppercase">Current Call</span>
                <span className="text-5xl font-black text-primary text-glow">B-12</span>
              </div>
              <Button size="lg" className="h-20 px-12 text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-yellow-950 shadow-[0_0_30px_rgba(234,179,8,0.5)] border-none" onClick={callBingo}>
                BINGO!
              </Button>
            </div>

            <div className="grid grid-cols-5 gap-2 md:gap-4 w-full aspect-square bg-card/50 p-4 rounded-3xl border shadow-2xl backdrop-blur">
              {Array.from({ length: 25 }).map((_, i) => (
                <PopScale key={i} delay={i * 0.02} onClick={() => toggleMark(i)}>
                  <div className={`w-full h-full flex items-center justify-center text-2xl font-bold rounded-xl md:rounded-2xl border-2 transition-all cursor-pointer ${
                    i === 12 ? 'bg-accent/20 border-accent text-accent' : 
                    marked.has(i) ? 'bg-primary border-primary text-primary-foreground shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]' : 'bg-card border-border hover:bg-secondary'
                  }`}>
                    {i === 12 ? 'FREE' : Math.floor(Math.random() * 75) + 1}
                  </div>
                </PopScale>
              ))}
            </div>
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
