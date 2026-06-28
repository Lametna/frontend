import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  animateFrom?: number;
}

export function XPBar({ currentXP, maxXP, level, animateFrom = 0 }: XPBarProps) {
  const [displayXP, setDisplayXP] = useState(animateFrom);

  useEffect(() => {
    if (animateFrom !== currentXP) {
      // Animate the number counting up
      let start = animateFrom;
      const end = currentXP;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeOut = progress * (2 - progress);
        const current = Math.floor(start + (end - start) * easeOut);
        
        setDisplayXP(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayXP(currentXP);
    }
  }, [currentXP, animateFrom]);

  const percentage = Math.min(100, Math.max(0, (displayXP / maxXP) * 100));

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
            {level}
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Level</span>
        </div>
        <div className="text-sm font-bold">
          <span className="text-accent">{displayXP.toLocaleString()}</span>
          <span className="text-muted-foreground"> / {maxXP.toLocaleString()} XP</span>
        </div>
      </div>
      
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden shadow-inner relative">
        <motion.div 
          className="h-full bg-gradient-to-r from-accent to-yellow-400 rounded-full"
          initial={{ width: `${(animateFrom / maxXP) * 100}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
      </div>
    </div>
  );
}
