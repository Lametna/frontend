import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function HangmanEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const secretWord = "PYRAMIDS";
  const [guessed, setGuessed] = useState<Set<string>>(new Set(['P', 'M']));
  const [wrongCount, setWrongCount] = useState(2);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const guessLetter = (letter: string) => {
    if (guessed.has(letter)) return;
    const newGuessed = new Set(guessed).add(letter);
    setGuessed(newGuessed);

    if (secretWord.includes(letter)) {
      audioManager.play('success');
      const won = secretWord.split('').every(l => newGuessed.has(l));
      if (won) setTimeout(onFinish, 1500);
    } else {
      audioManager.play('error');
      setWrongCount(prev => prev + 1);
      if (wrongCount + 1 >= 6) setTimeout(onFinish, 1500);
    }
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 to-black z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Hangman Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
            
            <div className="w-64 h-64 border-4 border-slate-700 mb-12 flex flex-col items-center justify-center relative bg-slate-900/50 rounded-xl">
               <div className="text-slate-500 font-mono">Drawing {wrongCount}/6</div>
               {/* Mock Hangman SVG */}
               <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 stroke-red-500 fill-none stroke-[3] p-4 opacity-80" strokeLinecap="round">
                  <path d="M10 90 L90 90 M30 90 L30 10 L70 10 L70 20" className="stroke-slate-600" />
                  {wrongCount > 0 && <circle cx="70" cy="30" r="10" />}
                  {wrongCount > 1 && <path d="M70 40 L70 70" />}
                  {wrongCount > 2 && <path d="M70 50 L55 40" />}
                  {wrongCount > 3 && <path d="M70 50 L85 40" />}
                  {wrongCount > 4 && <path d="M70 70 L55 85" />}
                  {wrongCount > 5 && <path d="M70 70 L85 85" />}
               </svg>
            </div>

            <div className="flex gap-4 mb-12 flex-wrap justify-center">
               {secretWord.split('').map((l, i) => (
                 <PopScale key={i} delay={i * 0.1}>
                   <div className="w-16 h-20 border-b-8 border-primary flex items-end justify-center pb-2 text-6xl font-black uppercase text-glow">
                     {guessed.has(l) ? l : ''}
                   </div>
                 </PopScale>
               ))}
            </div>

            <div className="grid grid-cols-7 gap-2 w-full max-w-2xl bg-card p-6 rounded-3xl border shadow-2xl">
               {alphabet.map(l => (
                 <Button 
                   key={l} 
                   variant={guessed.has(l) ? (secretWord.includes(l) ? 'default' : 'destructive') : 'secondary'} 
                   disabled={guessed.has(l)}
                   className="h-14 text-xl font-bold"
                   onClick={() => guessLetter(l)}
                 >
                   {l}
                 </Button>
               ))}
            </div>

          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
