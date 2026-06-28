import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function BusCompleteEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'letter-roll' | 'playing'>('host-config');
  const [letter, setLetter] = useState('?');
  const categories = ['Boy', 'Girl', 'Animal', 'Plant', 'Inanimate', 'Country'];
  
  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('letter-roll');
    setTimeout(() => {
      audioManager.play('success');
      setLetter('M'); // Mock random letter
      setTimeout(() => setLocalPhase('playing'), 2000);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-blue-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Bus Complete Config</h2>
            <div className="flex flex-wrap gap-2 mb-8">
               {categories.map(cat => <div key={cat} className="px-3 py-1 bg-primary/20 text-primary rounded-full">{cat}</div>)}
            </div>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'letter-roll' && (
          <SlideUp key="roll" className="z-10 flex flex-col items-center">
            <h2 className="text-2xl text-muted-foreground uppercase tracking-widest mb-8">Rolling Letter...</h2>
            <div className="w-48 h-48 bg-card rounded-3xl border shadow-[0_0_50px_rgba(0,210,255,0.3)] flex items-center justify-center overflow-hidden">
              <motion.div 
                animate={{ y: [0, -1000, 0] }} 
                transition={{ duration: 2, ease: "circOut" }}
                className="text-8xl font-black text-primary text-glow"
              >
                {letter}
              </motion.div>
            </div>
          </SlideUp>
        )}

        {localPhase === 'playing' && (
          <FadeIn key="playing" className="z-10 flex flex-col items-center w-full max-w-4xl px-4 py-8 h-full">
            <div className="flex justify-between w-full items-center mb-8">
              <div className="text-4xl font-black text-primary text-glow bg-card w-20 h-20 flex items-center justify-center rounded-2xl border">{letter}</div>
              <div className="text-3xl font-bold bg-card px-8 py-4 rounded-2xl border">01:59</div>
              <Button variant="destructive" onClick={onFinish}>Bus Complete!</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full flex-1 overflow-y-auto pb-20">
              {categories.map((cat, i) => (
                <PopScale key={cat} delay={i * 0.05} className="bg-card p-4 rounded-2xl border shadow-sm">
                  <label className="text-sm font-bold text-muted-foreground uppercase">{cat}</label>
                  <input type="text" className="w-full bg-background border-2 border-border focus:border-primary rounded-xl px-4 py-3 mt-2 text-xl outline-none" placeholder={`${letter}...`} />
                </PopScale>
              ))}
            </div>
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
