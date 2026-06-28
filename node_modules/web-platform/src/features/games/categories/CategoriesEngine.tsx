import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function CategoriesEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing' | 'review'>('host-config');
  const [letter, setLetter] = useState('?');
  const categories = ['A Movie', 'A Song', 'A City', 'Something Cold'];

  const startMatch = () => {
    audioManager.play('click');
    setLetter('C'); // Mock letter
    setLocalPhase('playing');
  };

  const submitAnswers = () => {
    audioManager.play('success');
    setLocalPhase('review');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-red-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Categories Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-4xl px-4 py-8 h-full">
            <div className="flex justify-between w-full items-center mb-8">
              <div className="text-4xl font-black text-primary text-glow bg-card w-20 h-20 flex items-center justify-center rounded-2xl border">{letter}</div>
              <div className="text-3xl font-bold bg-card px-8 py-4 rounded-2xl border text-red-500 animate-pulse">00:30</div>
            </div>

            <div className="flex flex-col gap-4 w-full flex-1 overflow-y-auto pb-20">
              {categories.map((cat, i) => (
                <PopScale key={cat} delay={i * 0.1} className="bg-card p-6 rounded-2xl border shadow-sm flex items-center gap-6">
                  <label className="text-lg font-bold text-muted-foreground w-48 uppercase">{cat}</label>
                  <input type="text" className="flex-1 bg-background border-2 border-border focus:border-primary rounded-xl px-4 py-3 text-2xl outline-none" placeholder={`${letter}...`} />
                </PopScale>
              ))}
            </div>

            <Button size="lg" className="w-full h-16 text-2xl mt-4" onClick={submitAnswers}>Submit</Button>
          </SlideUp>
        )}

        {localPhase === 'review' && (
          <FadeIn key="review" className="z-10 flex flex-col items-center w-full max-w-5xl px-4">
            <h2 className="text-4xl font-black mb-8 text-primary">Review: A Movie</h2>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
               <div className="bg-card p-6 rounded-2xl border flex justify-between items-center">
                 <div>
                   <div className="text-sm text-muted-foreground">Player 1</div>
                   <div className="text-2xl font-bold text-green-500">Casino Royale</div>
                 </div>
                 <Button variant="outline" className="text-green-500 border-green-500">Valid</Button>
               </div>
               
               <div className="bg-card p-6 rounded-2xl border flex justify-between items-center opacity-50">
                 <div>
                   <div className="text-sm text-muted-foreground">Player 2</div>
                   <div className="text-2xl font-bold text-red-500 line-through">Titanic</div>
                 </div>
                 <div className="text-sm font-bold text-red-500 uppercase">Wrong Letter</div>
               </div>
            </div>
            
            <Button size="lg" className="w-full h-16 text-2xl" onClick={onFinish}>Finish Game</Button>
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
