import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export function GlobalLoader() {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
        />
        <Loader2 className="w-12 h-12 text-primary opacity-0" />
      </div>
      <p className="mt-6 font-display font-bold tracking-widest uppercase text-muted-foreground animate-pulse text-sm">
        Loading...
      </p>
    </motion.div>
  );
}
