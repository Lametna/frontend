import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';
import { Moon, Sun } from 'lucide-react';

export default function WerewolfEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'night' | 'day'>('host-config');

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('night');
  };

  const wakeUp = () => {
    audioManager.play('notification');
    setLocalPhase('day');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden transition-colors duration-1000" style={{ backgroundColor: localPhase === 'night' ? '#064e3b' : '#f8fafc' }}>
      
      {localPhase === 'night' && <div className="absolute inset-0 bg-emerald-900/10 z-0" />}
      {localPhase === 'day' && <div className="absolute inset-0 bg-amber-100/30 z-0" />}

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center text-foreground">Werewolf Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'night' && (
          <SlideUp key="night" className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
            <Moon className="w-24 h-24 text-emerald-300 mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(110,231,183,0.5)]" />
            <h1 className="text-5xl font-black text-emerald-100 mb-12 tracking-widest uppercase">The Village Sleeps</h1>
            
            <div className="w-full bg-emerald-950/80 backdrop-blur border border-emerald-800 p-8 rounded-3xl text-center">
               <h3 className="text-xl text-emerald-400 mb-4">You are the</h3>
               <h2 className="text-6xl font-black text-rose-500 text-glow mb-8 uppercase tracking-tight">WEREWOLF</h2>
               <p className="text-emerald-200 mb-8">Select someone to devour.</p>
               <Button variant="destructive" size="lg" className="h-16 px-12 text-xl" onClick={wakeUp}>Devour Player 2</Button>
            </div>
          </SlideUp>
        )}

        {localPhase === 'day' && (
          <FadeIn key="day" className="z-10 flex flex-col items-center w-full max-w-4xl px-4">
            <Sun className="w-32 h-32 text-amber-500 mb-8 animate-[spin_20s_linear_infinite] drop-shadow-[0_0_50px_rgba(245,158,11,0.8)]" />
            <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-widest uppercase">The Village Wakes</h1>
            <p className="text-2xl text-slate-700 mb-12 font-bold">Player 2 was found eliminated.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full text-slate-900">
               {['Player 1', 'Player 3', 'Player 4'].map((p, i) => (
                 <PopScale key={i} delay={i * 0.1} className="bg-white border-2 border-slate-200 p-6 rounded-3xl flex flex-col items-center gap-4 cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-all shadow-md">
                   <div className="w-20 h-20 bg-slate-200 rounded-full" />
                   <h3 className="font-bold text-lg">{p}</h3>
                   <Button variant="outline" className="w-full" onClick={onFinish}>Lynch</Button>
                 </PopScale>
               ))}
            </div>
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
