import { useState } from 'react';

import { Search, Filter, Sparkles, Flame, Clock } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { MOCK_GAMES } from '../../../lib/mock-data';
import { GameCarousel } from '../components/GameCarousel';
import { FeaturedGameCard } from '../components/FeaturedGameCard';
import { GameCard } from '../components/GameCard';

export function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(MOCK_GAMES.map(g => g.category)));
  
  const filteredGames = MOCK_GAMES.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = activeCategory ? g.category === activeCategory : true;
    return matchesSearch && matchesCat;
  });

  const featuredGames = MOCK_GAMES.filter(g => g.popularity > 90000).slice(0, 3);
  const trendingGames = MOCK_GAMES.filter(g => g.isTrending).slice(0, 10);
  const newReleases = MOCK_GAMES.filter(g => g.isNew).slice(0, 10);
  const continuePlaying = MOCK_GAMES.slice(4, 10); // Simulated history

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sticky top-16 z-30 bg-background/80 backdrop-blur-md pt-4 pb-4">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-2">Game Library</h1>
          <p className="text-muted-foreground">Discover, play, and dominate.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="w-5 h-5 absolute left-3 top-3 text-muted-foreground" />
            <Input 
              placeholder="Search games, tags..." 
              className="pl-10 h-12 rounded-xl bg-card border shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border shadow-sm bg-card shrink-0">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {(!searchQuery && !activeCategory) ? (
        <>
          {/* Hero Section */}
          <div className="w-full">
            <FeaturedGameCard game={featuredGames[0]} />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm cursor-pointer whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setActiveCategory(null)}
            >
              All Games
            </Badge>
            {categories.map(cat => (
              <Badge 
                key={cat} 
                variant="outline" 
                className="px-4 py-2 text-sm cursor-pointer whitespace-nowrap bg-card hover:bg-secondary transition-colors"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Carousels */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-[-1.5rem] mt-4 px-1 z-10 relative">
              <Clock className="w-5 h-5 text-blue-500" /> <span className="font-bold text-lg text-blue-500">Jump Back In</span>
            </div>
            <GameCarousel title="" games={continuePlaying} />

            <div className="flex items-center gap-2 mb-[-1.5rem] mt-4 px-1 z-10 relative">
              <Flame className="w-5 h-5 text-orange-500" /> <span className="font-bold text-lg text-orange-500">Trending Now</span>
            </div>
            <GameCarousel title="" games={trendingGames} actionLabel="See All" />

            <div className="flex items-center gap-2 mb-[-1.5rem] mt-4 px-1 z-10 relative">
              <Sparkles className="w-5 h-5 text-accent" /> <span className="font-bold text-lg text-accent">New Releases</span>
            </div>
            <GameCarousel title="" games={newReleases} actionLabel="See All" />
          </div>
        </>
      ) : (
        /* Filtered Grid View */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Results</h2>
              <Badge variant="secondary">{filteredGames.length} games</Badge>
            </div>
            {activeCategory && (
              <Button variant="ghost" size="sm" onClick={() => setActiveCategory(null)}>Clear Filters</Button>
            )}
          </div>
          
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredGames.map((game, i) => (
                <GameCard key={game.id} game={game} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border rounded-3xl bg-card/50 flex flex-col items-center">
              <Search className="w-12 h-12 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-xl font-bold mb-2">No games found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              <Button className="mt-6" onClick={() => {setSearchQuery(''); setActiveCategory(null)}}>View All Games</Button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
