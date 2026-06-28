import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function DrawGuessEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'playing'>('host-config');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('playing');
  };

  useEffect(() => {
    if (localPhase === 'playing' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [localPhase]);

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Draw & Guess Config</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'playing' && (
          <SlideUp key="playing" className="z-10 flex w-full max-w-6xl h-[80vh] px-4 gap-4">
            {/* Canvas Section */}
            <div className="flex-1 bg-card rounded-3xl border shadow-2xl overflow-hidden flex flex-col relative">
              <div className="p-4 bg-secondary/50 border-b flex justify-between items-center">
                <div className="text-xl font-bold">Draw: <span className="text-primary text-glow">Elephant</span></div>
                <div className="text-xl font-bold">01:29</div>
              </div>
              <canvas 
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-full cursor-crosshair touch-none"
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                onMouseMove={draw}
              />
            </div>
            
            {/* Chat Section */}
            <div className="w-80 bg-card rounded-3xl border shadow-2xl flex flex-col">
              <div className="p-4 border-b font-bold">Guesses</div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
                <div><span className="font-bold">Ahmed:</span> Tiger?</div>
                <div><span className="font-bold">Omar:</span> Dog?</div>
                <div className="text-green-500 font-bold bg-green-500/10 p-2 rounded-lg">Sarah guessed the word!</div>
              </div>
              <div className="p-4 border-t">
                 <input type="text" className="w-full bg-background border rounded-xl px-4 py-2" placeholder="Type guess..." />
                 <Button className="w-full mt-2" onClick={onFinish}>End Round</Button>
              </div>
            </div>
          </SlideUp>
        )}
      </AnimatePresence>
    </div>
  );
}
