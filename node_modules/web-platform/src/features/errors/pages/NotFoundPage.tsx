import { motion } from 'framer-motion';
import { Home, Search, Compass } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background p-6 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-secondary/50 flex items-center justify-center mb-8 border backdrop-blur-sm shadow-xl">
          <Compass className="w-16 h-16 text-muted-foreground animate-[spin_10s_linear_infinite]" />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 mb-4 drop-shadow-sm tracking-tighter">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Lost in the desert</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Button size="lg" className="h-14 flex-1 rounded-2xl text-lg font-bold gap-2 shadow-lg" onClick={() => navigate('/')}>
            <Home className="w-5 h-5" /> Go Home
          </Button>
          <Button variant="secondary" size="lg" className="h-14 flex-1 rounded-2xl text-lg gap-2" onClick={() => navigate('/games')}>
            <Search className="w-5 h-5" /> Browse Games
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
