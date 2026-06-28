import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { GameCard } from './GameCard';
import type { Game } from '../../../lib/mock-games';

interface GameCarouselProps {
  title: string;
  games: Game[];
  actionLabel?: string;
  onAction?: () => void;
}

export function GameCarousel({ title, games, actionLabel, onAction }: GameCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full flex flex-col mb-12">
      <div className="flex items-end justify-between mb-6 px-1">
        <h2 className="text-2xl font-display font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-4">
          {actionLabel && (
            <Button variant="link" className="text-primary font-bold p-0 h-auto" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-border/50 hover:bg-secondary" onClick={() => scroll('left')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-border/50 hover:bg-secondary" onClick={() => scroll('right')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative group">
        {/* Scroll gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-1 pb-4"
          style={{ scrollPadding: '1rem' }}
        >
          {games.map((game, index) => (
            <div key={game.id} className="w-[200px] md:w-[240px] shrink-0 snap-start">
              <GameCard game={game} index={index % 5} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
