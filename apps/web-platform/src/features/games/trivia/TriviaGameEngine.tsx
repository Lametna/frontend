import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PopScale, FadeIn, SlideUp } from '../../../../components/ui/animations';
import { Button } from '../../../../components/ui/button';
import { audioManager } from '../../../../lib/audio';

export default function TriviaGameEngine({ matchId, onFinish }: { matchId: string, onFinish: () => void }) {
  const [localPhase, setLocalPhase] = useState<'host-config' | 'question' | 'scoreboard'>('host-config');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const startMatch = () => {
    audioManager.play('click');
    setLocalPhase('question');
  };

  const answerQuestion = (index: number) => {
    audioManager.play('click');
    setSelectedAnswer(index);
    setTimeout(() => {
      audioManager.play(index === 1 ? 'success' : 'error');
      setLocalPhase('scoreboard');
    }, 2000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/20 z-0" />

      <AnimatePresence mode="wait">
        {localPhase === 'host-config' && (
          <FadeIn key="config" className="z-10 bg-card/80 backdrop-blur p-8 rounded-3xl border shadow-2xl max-w-lg w-full">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">Trivia Configuration</h2>
            <Button size="lg" className="w-full h-14 text-xl" onClick={startMatch}>Start Game</Button>
          </FadeIn>
        )}

        {localPhase === 'question' && (
          <SlideUp key="question" className="z-10 flex flex-col items-center w-full max-w-3xl px-4">
            <div className="text-4xl font-bold mb-8 text-center text-glow">What is the capital of Egypt?</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {['Alexandria', 'Cairo', 'Luxor', 'Giza'].map((ans, i) => (
                <PopScale key={i} delay={i * 0.1} onClick={() => answerQuestion(i)}>
                  <div className={`p-6 rounded-2xl border-2 text-xl font-bold text-center cursor-pointer transition-all ${
                    selectedAnswer === i ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border hover:bg-secondary'
                  }`}>
                    {ans}
                  </div>
                </PopScale>
              ))}
            </div>
          </SlideUp>
        )}

        {localPhase === 'scoreboard' && (
          <FadeIn key="scoreboard" className="z-10 bg-card/90 backdrop-blur p-12 rounded-3xl border text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-8 text-primary">Round Scores</h2>
            <div className="space-y-4 mb-8 text-left">
              <div className="flex justify-between items-center text-xl bg-secondary/50 p-4 rounded-xl"><span>Player 1</span><span className="font-bold text-accent">1,250</span></div>
              <div className="flex justify-between items-center text-xl bg-secondary/50 p-4 rounded-xl"><span>Player 2</span><span className="font-bold text-accent">950</span></div>
            </div>
            <Button size="lg" onClick={onFinish} className="w-full">Finish Game</Button>
          </FadeIn>
        )}
      </AnimatePresence>
    </div>
  );
}
