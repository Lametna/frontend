import { motion } from 'framer-motion';
import { Play, Star, Trophy, UsersRound } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import type { Game } from '../../../lib/mock-games';
import { useNavigate } from 'react-router';

interface FeaturedGameCardProps {
  game: Game;
}

export function FeaturedGameCard({ game }: FeaturedGameCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
      whileHover="hover"
      initial="initial"
      onClick={() => navigate(`/games/${game.id}`)}
    >
      <div className="absolute inset-0 bg-background/20" />
      
      {/* Background Media */}
      <div className="absolute inset-0">
        {game.heroVideo ? (
          <video 
            src={game.heroVideo} 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          />
        ) : (
          <img 
            src={game.bannerImage} 
            alt={game.title} 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
        <motion.div
          variants={{
            initial: { y: 20, opacity: 0.9 },
            hover: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex gap-2 mb-4">
            <Badge className="bg-primary text-primary-foreground border-none">Featured</Badge>
            {game.isNew && <Badge className="bg-accent text-accent-foreground border-none">New Release</Badge>}
            <Badge variant="secondary" className="backdrop-blur-md bg-secondary/50">{game.category}</Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight mb-4 drop-shadow-lg">
            {game.title}
          </h1>
          
          <p className="text-lg text-white/80 line-clamp-2 mb-6 max-w-xl">
            {game.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-medium text-white/90">
            <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {game.rating} Rating</div>
            <div className="flex items-center gap-1.5"><UsersRound className="w-4 h-4 text-primary" /> {game.activePlayers.toLocaleString()} Playing</div>
            <div className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-accent" /> {game.difficulty}</div>
          </div>

          <div className="flex items-center gap-4">
            <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold gap-3 shadow-lg shadow-primary/25 hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); navigate(`/games/${game.id}/lobby`); }}>
              <Play className="w-5 h-5 fill-current" /> Play Now
            </Button>
            <Button size="lg" variant="secondary" className="h-14 px-8 rounded-2xl backdrop-blur-md bg-secondary/30 hover:bg-secondary/50 border-white/10 text-white transition-colors">
              Details
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
