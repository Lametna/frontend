import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function MemoryMatchEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const handleCardClick = (i: number) => {
    if (flipped.length >= 2 || matched.includes(i) || flipped.includes(i)) return;
    audioManager.play('click');
    
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        // Mock match logic
        if (newFlipped[0] % 8 === newFlipped[1] % 8) {
          audioManager.play('success');
          setMatched([...matched, ...newFlipped]);
        } else {
          audioManager.play('error');
        }
        setFlipped([]);
        
        // Mock finish
        if (matched.length + 2 === 16) {
           setTimeout(onFinish, 1000);
        }
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/20 to-blue-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Memory Match Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-2xl px-4">
            
            <div className="w-full flex justify-between items-center mb-8">
              <div className="bg-card px-6 py-3 rounded-xl border text-xl font-bold">Matches: {matched.length / 2}/8</div>
              <div className="bg-card px-6 py-3 rounded-xl border text-xl font-bold text-primary">02:30</div>
            </div>

            <div className="grid grid-cols-4 gap-4 w-full aspect-square">
              {Array.from({ length: 16 }).map((_, i) => {
                const isFlipped = flipped.includes(i) || matched.includes(i);
                return (
                  <motion.div 
                    key={i}
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => handleCardClick(i)}
                    style={{ perspective: 1000 }}
                  >
                    <motion.div
                      className="w-full h-full absolute inset-0"
                      initial={false}
                      animate={{ rotateY: isFlipped ? 180 : 0, scale: matched.includes(i) ? 0.9 : 1, opacity: matched.includes(i) ? 0.5 : 1 }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Back of Card */}
                      <div className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                         <div className="w-1/2 h-1/2 rounded-full bg-primary/30" />
                      </div>
                      
                      {/* Front of Card */}
                      <div className="absolute inset-0 bg-card border-2 border-primary rounded-xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                         <span className="text-4xl font-black text-primary">{i % 8}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
