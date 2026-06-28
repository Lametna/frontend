import { useState } from 'react';
import { motion } from 'framer-motion';
import { CURRENT_USER, MOCK_ACHIEVEMENTS, MOCK_ACTIVITY, MOCK_GAMES } from '../../../lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Settings, Edit3, Share2, Trophy, Flame, Star, Gamepad2, Clock } from 'lucide-react';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity'>('overview');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  } as any;

  return (
    <motion.div 
      className="space-y-6 pb-12 animate-fade-in"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Profile Header & Banner */}
      <motion.section variants={itemVariants} className="relative rounded-3xl overflow-hidden bg-card shadow-sm border">
        <div className="h-48 md:h-64 w-full relative">
          {CURRENT_USER.banner ? (
            <img src={CURRENT_USER.banner} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-primary to-accent"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm rounded-full">
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="px-6 md:px-10 pb-8 relative flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
          <div className="relative">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-card shadow-xl ring-4 ring-primary/20">
              <AvatarImage src={CURRENT_USER.avatar} />
              <AvatarFallback>{CURRENT_USER.username[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-card shadow-sm">
              {CURRENT_USER.level}
            </div>
          </div>

          <div className="flex-1 space-y-2 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-2">
                  {CURRENT_USER.username}
                  {CURRENT_USER.badges.includes('VIP') && <Badge className="bg-yellow-500/20 text-yellow-600 border-none shadow-none text-xs">VIP</Badge>}
                </h1>
                <p className="text-muted-foreground">{CURRENT_USER.bio}</p>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Button className="flex-1 md:flex-none shadow-md shadow-primary/20"><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</Button>
                <Button variant="outline" size="icon"><Share2 className="w-4 h-4" /></Button>
                <Button variant="outline" size="icon"><Settings className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {CURRENT_USER.badges.map(badge => (
                <Badge key={badge} variant="secondary">{badge}</Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border/50">
        {[
          { id: 'overview', label: 'Overview', icon: Star },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'activity', label: 'Activity', icon: Clock }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {activeTab === 'overview' && (
          <>
            {/* Stats Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center bg-secondary/50 p-3 rounded-xl">
                    <span className="text-muted-foreground flex items-center gap-2"><Gamepad2 className="w-4 h-4"/> Games Played</span>
                    <span className="font-bold">1,248</span>
                  </div>
                  <div className="flex justify-between items-center bg-secondary/50 p-3 rounded-xl">
                    <span className="text-muted-foreground flex items-center gap-2"><Trophy className="w-4 h-4"/> Tournaments Won</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center bg-secondary/50 p-3 rounded-xl">
                    <span className="text-muted-foreground flex items-center gap-2"><Flame className="w-4 h-4"/> Current Streak</span>
                    <span className="font-bold text-accent">5 Days</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Level {CURRENT_USER.level}</span>
                    <span className="text-muted-foreground">{CURRENT_USER.xp} / 10,000 XP</span>
                  </div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${(CURRENT_USER.xp / 10000) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Column */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-display font-bold">Favorite Games</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_GAMES.slice(0,2).map(game => (
                  <Card key={game.id} className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="h-32 relative overflow-hidden">
                      <img src={game.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <Badge className="absolute bottom-2 left-2 bg-black/50 border-none text-white">{game.category}</Badge>
                    </div>
                    <CardContent className="p-4 flex justify-between items-center">
                      <h3 className="font-bold">{game.title}</h3>
                      <p className="text-xs text-muted-foreground">120h played</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'achievements' && (
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_ACHIEVEMENTS.map(ach => (
                <Card key={ach.id} className={`overflow-hidden border-2 ${ach.dateUnlocked ? 'border-border' : 'border-dashed opacity-60 grayscale'}`}>
                  <CardContent className="p-4 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-3xl shrink-0">
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold leading-tight">{ach.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{ach.description}</p>
                      {ach.progress !== undefined && ach.total !== undefined && !ach.dateUnlocked && (
                        <div className="mt-2 w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${(ach.progress/ach.total)*100}%` }}></div>
                        </div>
                      )}
                      {ach.dateUnlocked && <p className="text-[10px] text-primary mt-2 uppercase font-semibold">Unlocked {ach.dateUnlocked}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="md:col-span-3 max-w-2xl">
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {MOCK_ACTIVITY.map((activity) => (
                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    {activity.type === 'achievement' ? <Trophy className="w-4 h-4"/> : <Gamepad2 className="w-4 h-4"/>}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{activity.type === 'achievement' ? 'Achievement Unlocked' : 'Played Game'}</span>
                      <time className="text-xs text-muted-foreground">{activity.timestamp}</time>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </motion.div>
  );
}
