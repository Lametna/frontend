import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function WordChainEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const [words, setWords] = useState<string[]>(['Apple', 'Elephant', 'Tiger']);
  const [input, setInput] = useState('');

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const submitWord = () => {
    if (!input) return;
    const lastWord = words[words.length - 1];
    const requiredLetter = lastWord[lastWord.length - 1].toLowerCase();
    
    if (input[0].toLowerCase() === requiredLetter) {
      audioManager.play('success');
      setWords([...words, input]);
      setInput('');
      if (words.length > 6) setTimeout(onFinish, 1000);
    } else {
      audioManager.play('error');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/20 to-pink-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Word Chain Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-3xl px-4">
            
            <div className="w-full flex justify-between items-center mb-8">
               <div className="text-xl font-bold bg-card px-6 py-2 rounded-xl border text-primary">Your Turn</div>
               <div className="text-3xl font-black text-red-500 animate-pulse bg-card px-6 py-2 rounded-xl border">00:08</div>
            </div>

            <div className="w-full flex flex-wrap gap-2 mb-8 justify-center">
              {words.map((w, i) => (
                <PopScale key={i} className="px-6 py-3 bg-secondary/80 text-secondary-foreground rounded-2xl text-2xl font-bold opacity-50">
                  {w}
                </PopScale>
              ))}
              <PopScale className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-4xl font-black shadow-[0_0_30px_rgba(var(--primary),0.5)]">
                {words[words.length - 1]}
              </PopScale>
            </div>

            <div className="w-full relative">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-black text-muted-foreground uppercase">
                 {words[words.length - 1].slice(-1)}...
               </div>
               <input 
                 type="text" 
                 className="w-full bg-card border-2 border-primary rounded-3xl h-24 pl-24 pr-8 text-4xl font-black outline-none focus:shadow-[0_0_50px_rgba(var(--primary),0.3)] transition-shadow uppercase" 
                 value={input}
                 onChange={e => setInput(e.target.value.toUpperCase())}
                 onKeyDown={e => e.key === 'Enter' && submitWord()}
               />
            </div>

            <Button size="lg" className="w-full mt-6 h-16 text-2xl font-bold" onClick={submitWord}>Submit Word</Button>
          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
