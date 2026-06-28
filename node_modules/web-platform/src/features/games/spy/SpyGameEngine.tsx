import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

// Spy Game Engine
export default function SpyGameEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'role-reveal' | 'playing'>('host-config');
  const [role, setRole] = useState<'spy' | 'civilian' | null>(null);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('role-reveal');
    setTimeout(() => {
      setRole(Math.random() > 0.5 ? 'spy' : 'civilian');
    }, 1500);
  };

  const finishReveal = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Spy Configuration</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-bold text-muted-foreground">Select Categories</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Locations', 'Food', 'Animals', 'Professions'].map(cat => (
                    <div key={cat} className="px-4 py-2 rounded-full border bg-secondary/50 hover:bg-primary/20 cursor-pointer transition-colors">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'role-reveal' && (
          <SlideUp key="reveal" className="z-10 flex flex-col items-center justify-center">
            {!role ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-24 h-24 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full" />
            ) : (
              <PopScale className="bg-card/90 backdrop-blur p-12 rounded-3xl border text-center shadow-[0_0_50px_rgba(255,0,0,0.2)]">
                <h3 className="text-2xl text-muted-foreground uppercase tracking-widest mb-4">Your Role Is</h3>
                <h1 className={`text-6xl font-black uppercase tracking-tight mb-8 ${role === 'spy' ? 'text-red-500 text-glow' : 'text-primary box-glow'}`}>
                  {role}
                </h1>
                <Button size="lg" onClick={finishReveal}>I understand</Button>
              </PopScale>
            )}
          </SlideUp>
        )}

        {localPhase === 'playing' && (
          <FadeIn key="playing" className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
             <div className="w-full flex justify-between items-center mb-12">
               <div className="text-2xl font-bold bg-card px-6 py-3 rounded-2xl border">04:59</div>
               <Button variant="destructive" onClick={onFinish}>End Match</Button>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {['Player 1', 'Player 2', 'Player 3', 'Player 4'].map((p, i) => (
                 <PopScale key={i} delay={i * 0.1} className="bg-card border p-6 rounded-3xl flex flex-col items-center gap-4 cursor-pointer hover:bg-secondary transition-colors">
                   <div className="w-20 h-20 bg-muted rounded-full" />
                   <h3 className="font-bold">{p}</h3>
                   <Button variant="outline" className="w-full">Vote</Button>
                 </PopScale>
               ))}
             </div>
          </FadeIn>
        )}
      </AnimatePresence>

    </div>
  );
}
