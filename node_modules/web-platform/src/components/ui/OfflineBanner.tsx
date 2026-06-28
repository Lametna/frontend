import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[200] flex justify-center pt-2 px-4 pointer-events-none"
        >
          <div className="bg-destructive/95 backdrop-blur text-destructive-foreground px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium pointer-events-auto border border-destructive-foreground/20">
            <WifiOff className="w-5 h-5 animate-pulse" />
            No Internet Connection. Playing in Offline Mode.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
