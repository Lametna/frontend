import { motion } from 'framer-motion';
import { Star, UsersRound, Trophy, ArrowRight } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import type { Game } from '../../../lib/mock-games';
import { useNavigate } from 'react-router';

import { audioManager } from '../../../lib/audio';
import { PopScale } from '../../../components/ui/animations';

interface GameCardProps {
  game: Game;
  index?: number;
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const navigate = useNavigate();

  return (
    <PopScale
      delay={index * 0.05}
      className="group relative flex flex-col rounded-2xl bg-card border border-border/50 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:box-glow transition-all duration-300"
      onClick={() => {
        audioManager.play('click');
        navigate(`/games/${game.id}`);
      }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
        <img 
          src={game.coverImage} 
          alt={game.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {game.isTrending && <Badge className="bg-accent text-accent-foreground border-none text-[10px] uppercase font-bold shadow-md">Trending</Badge>}
          {game.isNew && <Badge className="bg-primary text-primary-foreground border-none text-[10px] uppercase font-bold shadow-md">New</Badge>}
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 z-10">
           <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-primary-foreground shadow-xl shadow-primary/30">
             <ArrowRight className="w-8 h-8 ml-1" />
           </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 relative z-10 bg-gradient-to-b from-transparent to-card">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{game.title}</h3>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[32px]">
          {game.description}
        </p>

        <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-y-2 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs font-medium text-foreground">
            <UsersRound className="w-3.5 h-3.5 text-primary" /> {game.playerCount.min}-{game.playerCount.max}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground">
            <Trophy className="w-3.5 h-3.5 text-accent" /> {game.difficulty}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-foreground">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> {game.rating}
          </div>
        </div>
      </div>
    </PopScale>
  );
}
