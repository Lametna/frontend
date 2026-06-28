import { useParams, useNavigate } from 'react-router';
import { Play, Star, Trophy, UsersRound, ArrowLeft, Share2, Heart, Info, Gamepad2, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { MOCK_GAMES, MOCK_LEADERBOARD, EXTENDED_USERS } from '../../../lib/mock-data';

export function GameDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const game = MOCK_GAMES.find(g => g.id === id) || MOCK_GAMES[0];
  const friendsPlaying = EXTENDED_USERS.filter(u => u.status === 'in-game').slice(0, 5);

  return (
    <div className="flex flex-col animate-fade-in pb-24">
      
      {/* Hero Banner Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full mt-[-2rem] md:mt-[-2rem] mb-8 -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)]">
        {game.heroVideo ? (
          <video 
            src={game.heroVideo} 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={game.bannerImage} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Nav Bar within Hero */}
        <div className="absolute top-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-center z-10">
          <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur border-none hover:bg-background/80" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur border-none hover:bg-background/80 text-destructive">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-background/50 backdrop-blur border-none hover:bg-background/80">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-4 md:left-8 right-4 md:right-8 pb-8 z-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-background shadow-2xl shrink-0 bg-secondary">
              <img src={game.coverImage} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 mb-2">
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-none">{game.category}</Badge>
                {game.isTrending && <Badge className="bg-accent text-accent-foreground border-none">Trending</Badge>}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-2 drop-shadow-md">{game.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/80">
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {game.rating} ({game.popularity.toLocaleString()} reviews)</div>
                <div className="flex items-center gap-1.5"><UsersRound className="w-4 h-4 text-primary" /> {game.activePlayers.toLocaleString()} Active Players</div>
                <div className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-accent" /> {game.difficulty}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-muted-foreground" /> {game.estimatedDuration} mins / match</div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3 min-w-[200px]">
              <Button size="lg" className="w-full h-14 rounded-2xl text-lg font-bold gap-3 shadow-xl shadow-primary/30 hover:scale-105 transition-transform" onClick={() => navigate(`/games/${game.id}/lobby`)}>
                <Play className="w-5 h-5 fill-current" /> Play Game
              </Button>
              <Button variant="secondary" className="w-full h-12 rounded-xl bg-secondary/50 backdrop-blur border hover:bg-secondary">
                <UsersRound className="w-4 h-4 mr-2" /> Host Private Party
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-card rounded-3xl p-6 md:p-8 border shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-primary" /> About Game</h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {game.description} Dive into a world of competitive strategy and quick reflexes. Gather your friends or match up globally to climb the ranks and prove your mastery.
            </p>
            
            <h4 className="font-bold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Features</h4>
            <div className="flex flex-wrap gap-2">
              {game.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-secondary/50 py-1.5 px-3 text-sm rounded-lg">{tag}</Badge>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-3xl p-6 md:p-8 border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-accent" /> Global Leaderboard</h3>
              <Button variant="link" className="text-primary font-bold">View Full Rankings</Button>
            </div>
            
            <div className="space-y-1 border rounded-2xl overflow-hidden bg-background/50">
              {MOCK_LEADERBOARD.slice(0, 5).map((entry, index) => {
                const user = EXTENDED_USERS.find(u => u.id === entry.userId)!;
                return (
                  <div key={entry.id} className="flex items-center gap-4 p-4 bg-card hover:bg-secondary/50 transition-colors border-b last:border-0">
                    <div className={`w-8 h-8 flex items-center justify-center font-bold text-lg ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      #{entry.rank}
                    </div>
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{user.username}</p>
                      <p className="text-xs text-muted-foreground">Level {user.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">{entry.score.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase">Rating</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column - Meta */}
        <div className="space-y-8">
          
          {/* Friends Playing */}
          <section className="bg-card rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-green-500" /> Friends Playing Now</h3>
            <div className="space-y-3">
              {friendsPlaying.length > 0 ? friendsPlaying.map(friend => (
                <div key={friend.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10 border-2 border-green-500">
                      <AvatarImage src={friend.avatar} />
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{friend.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{friend.richPresence || 'In Match'}</p>
                  </div>
                  <Button size="sm" variant="secondary" className="h-8 rounded-full">Spectate</Button>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No friends playing currently.</p>
              )}
            </div>
          </section>

          {/* Game Stats */}
          <section className="bg-card rounded-3xl p-6 border shadow-sm">
            <h3 className="font-bold mb-4">Your Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-primary">142</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Matches</span>
              </div>
              <div className="bg-secondary/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-accent">68%</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Win Rate</span>
              </div>
              <div className="bg-secondary/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-yellow-500">42</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">MVP</span>
              </div>
              <div className="bg-secondary/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-purple-500">12</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Hours</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-xl border-dashed">View Full History</Button>
          </section>

          {/* Info Block */}
          <section className="bg-card rounded-3xl p-6 border shadow-sm text-sm">
            <h3 className="font-bold mb-4">Information</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between border-b pb-2">
                <span>Developer</span>
                <span className="text-foreground font-medium">{game.developer}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Version</span>
                <span className="text-foreground font-medium">{game.version}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Release Date</span>
                <span className="text-foreground font-medium">{new Date(game.releaseDate).toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs text-muted-foreground gap-2"><AlertTriangle className="w-3 h-3"/> Report Game Issue</Button>
          </section>

        </div>
      </div>
    </div>
  );
}
