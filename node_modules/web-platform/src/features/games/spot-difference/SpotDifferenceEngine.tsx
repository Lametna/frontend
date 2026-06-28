import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function SpotDifferenceEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const [markers, setMarkers] = useState<{x: number, y: number, isCorrect: boolean}[]>([]);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const isCorrect = Math.random() > 0.5; // Mock logic
    audioManager.play(isCorrect ? 'success' : 'error');
    
    setMarkers([...markers, { x, y, isCorrect }]);

    if (markers.filter(m => m.isCorrect).length >= 2) {
      setTimeout(onFinish, 1500);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-black z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Spot Difference Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex flex-col items-center w-full max-w-7xl px-4">
            
            <div className="w-full flex justify-between items-center mb-8">
               <div className="text-xl font-bold bg-card px-6 py-2 rounded-xl border">Differences: {markers.filter(m => m.isCorrect).length}/5</div>
               <div className="text-2xl font-black bg-card px-8 py-2 rounded-xl border text-teal-400 text-glow">01:45</div>
               <Button variant="outline" onClick={onFinish}>Hint (-30s)</Button>
            </div>

            <div className="flex gap-4 w-full aspect-[2/1]">
              <div className="flex-1 bg-card rounded-3xl border shadow-xl relative overflow-hidden bg-cover bg-center cursor-crosshair" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800)' }} onClick={handleImageClick}>
                {markers.map((m, i) => (
                  <PopScale key={i} className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-4 ${m.isCorrect ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'} pointer-events-none`} style={{ left: `${m.x}%`, top: `${m.y}%` }} />
                ))}
              </div>
              <div className="flex-1 bg-card rounded-3xl border shadow-xl relative overflow-hidden bg-cover bg-center cursor-crosshair" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800)' }} onClick={handleImageClick}>
                {markers.map((m, i) => (
                  <PopScale key={i} className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-4 ${m.isCorrect ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'} pointer-events-none`} style={{ left: `${m.x}%`, top: `${m.y}%` }} />
                ))}
              </div>
            </div>

          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
