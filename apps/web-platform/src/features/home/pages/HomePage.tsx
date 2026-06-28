import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { MOCK_GAMES, MOCK_USERS, MOCK_ACTIVITY } from '../../../lib/mock-data';
import { Play, Trophy, Users, Star, ArrowRight } from 'lucide-react';

export function HomePage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  } as any;

  return (
    <motion.div 
      className="space-y-8 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="relative w-full h-[340px] rounded-3xl overflow-hidden glass shadow-2xl flex items-end p-8 bg-gradient-to-tr from-[#0B0F19] to-indigo-900 group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="max-w-2xl">
              <Badge variant="accent" className="mb-3">Season 1 is Live</Badge>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight drop-shadow-lg">Cairo Nights Racing</h1>
              <p className="text-white/80 mt-3 text-lg md:text-xl drop-shadow">Drift through the illuminated streets of modern Cairo. Unlock exclusive neon decals before the season ends.</p>
           </div>
           <div className="flex gap-3">
             <Button variant="glass" size="lg" className="shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               <Trophy className="w-5 h-5 mr-2" /> Leaderboard
             </Button>
             <Button variant="default" size="lg" className="shadow-[0_0_30px_rgba(0,210,255,0.4)]">
               <Play className="w-5 h-5 mr-2" /> Play Now
             </Button>
           </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Continue Playing */}
          <motion.section variants={itemVariants}>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-2xl font-display font-bold">Continue Playing</h2>
              <Button variant="link" className="text-muted-foreground hover:text-primary">View All <ArrowRight className="w-4 h-4 ml-1"/></Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_GAMES.slice(0, 2).map((game) => (
                 <Card key={game.id} className="group cursor-pointer hover:border-primary/50 transition-colors overflow-hidden glass-card">
                   <div className="h-40 bg-muted relative overflow-hidden">
                     <img src={game.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt={game.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                     <div className="absolute bottom-3 left-3 flex gap-2">
                       <Badge className="bg-black/50 backdrop-blur-md border-white/10 text-white"><Users className="w-3 h-3 mr-1"/> {game.activePlayers.toLocaleString()}</Badge>
                     </div>
                   </div>
                   <CardContent className="p-4 flex justify-between items-center bg-card/50">
                     <div>
                       <h3 className="font-bold text-lg leading-tight">{game.title}</h3>
                       <p className="text-xs text-muted-foreground mt-1">{game.category}</p>
                     </div>
                     <Button size="icon" className="rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"><Play className="w-4 h-4" fill="currentColor" /></Button>
                   </CardContent>
                 </Card>
              ))}
            </div>
          </motion.section>

          {/* Recommended Games Grid */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-display font-bold mb-4">Recommended For You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {MOCK_GAMES.map((game, i) => (
                 <div key={i} className="aspect-[3/4] rounded-2xl relative group overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all border border-border">
                    <img src={game.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={game.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="glass" className="w-8 h-8 rounded-full"><Star className="w-4 h-4 text-yellow-400" /></Button>
                    </div>

                    <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <h3 className="font-bold text-white leading-tight">{game.title}</h3>
                      <p className="text-xs text-primary mt-1 font-medium">{game.category}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.section>
        </div>

        {/* Right Column: Social & Activity */}
        <div className="space-y-8">
          
          {/* Daily Challenge */}
          <motion.section variants={itemVariants}>
            <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2"><Star className="w-5 h-5 text-accent" fill="currentColor" /> Daily Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Win 3 matches in Tarneeb Masters</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-bold text-primary">2 / 3</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary" 
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
                <Button className="w-full mt-4" variant="secondary">Jump In</Button>
              </CardContent>
            </Card>
          </motion.section>

          {/* Friends Online */}
          <motion.section variants={itemVariants}>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-display font-bold">Friends Online</h2>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">12 Online</span>
            </div>
            <Card className="glass-card">
              <CardContent className="p-0 divide-y divide-border/50">
                {MOCK_USERS.filter(u => u.status !== 'offline').slice(0, 4).map(user => (
                  <div key={user.id} className="flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${user.status === 'in-game' ? 'bg-accent' : 'bg-green-500'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user.username}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.richPresence || 'Online'}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* Activity Feed */}
          <motion.section variants={itemVariants}>
            <h2 className="text-xl font-display font-bold mb-4">Activity</h2>
            <div className="space-y-4">
              {MOCK_ACTIVITY.map(activity => {
                const user = MOCK_USERS.find(u => u.id === activity.userId);
                return (
                  <div key={activity.id} className="flex gap-3 text-sm">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-secondary/50 p-3 rounded-xl rounded-tl-none border border-border/50">
                      <p><span className="font-semibold">{user?.username}</span> {activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.section>

        </div>
      </div>
    </motion.div>
  );
}
