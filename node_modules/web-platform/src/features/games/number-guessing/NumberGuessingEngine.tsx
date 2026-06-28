import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function NumberGuessingEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState<string | null>(null);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const submitGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return;
    
    if (num === 42) {
      audioManager.play('victory');
      setHint('CORRECT!');
      setTimeout(onFinish, 2000);
    } else {
      audioManager.play('error');
      setHint(num < 42 ? 'HIGHER ⬆️' : 'LOWER ⬇️');
      setGuess('');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-black z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Number Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-md px-4">
            <h2 className="text-2xl font-bold text-muted-foreground mb-8">Guess a number between 1 and 100</h2>
            
            <div className="relative w-full mb-8">
              <input 
                type="number"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                className="w-full bg-card border-2 border-primary/50 rounded-3xl h-24 text-center text-6xl font-black text-primary focus:outline-none focus:border-primary shadow-lg"
                placeholder="?"
              />
            </div>

            {hint && (
              <PopScale key={hint} className="text-3xl font-bold text-accent text-glow mb-8 uppercase tracking-widest">
                {hint}
              </PopScale>
            )}

            <Button size="lg" className="w-full h-16 text-2xl font-bold" onClick={submitGuess}>Submit Guess</Button>
          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
