import { useState } from 'react';

import { Mic as MicIcon, MicOff as MicOffIcon, Settings as SettingsIcon, X as XIcon, Plus as PlusIcon, Headset, Volume2, ShieldAlert, Star, Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useAppStore } from '../../store/app';
import { EXTENDED_USERS } from '../../lib/mock-data';
import { Badge } from '../ui/badge';

export function PartySidebar() {
  const { toggleParty } = useAppStore();
  const [isReady, setIsReady] = useState(false);

  // Take first 4 users from extended users
  const partyMembers = EXTENDED_USERS.slice(0, 4).map((u, i) => ({
    ...u,
    isSpeaking: i === 1,
    isMuted: i === 2,
    isLeader: i === 0,
    isReady: i === 0 || i === 3,
  }));

  return (
    <div className="flex flex-col h-full bg-secondary/30 relative border-l border-border/50">
      
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-card/50 backdrop-blur shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-xl leading-none">The Squad</h3>
            <Badge variant="secondary" className="text-[10px] bg-primary/20 text-primary border-none">PUB</Badge>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Headset className="w-3 h-3" /> Voice Channel • {partyMembers.length}/8
          </p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <SettingsIcon className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleParty} className="w-8 h-8 rounded-full bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-colors">
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Voice Placeholder */}
      <div className="p-4 shrink-0">
        <div className="w-full h-24 rounded-2xl bg-card border shadow-sm relative overflow-hidden flex flex-col justify-end p-3">
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent"></div>
           <div className="absolute top-2 right-2 flex gap-1">
             <div className="w-1.5 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <div className="w-1.5 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '100ms' }}></div>
             <div className="w-1.5 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
           </div>
           <h4 className="font-bold text-sm z-10 flex items-center gap-2">
             <Volume2 className="w-4 h-4 text-green-500" /> Voice Connected
           </h4>
           <p className="text-xs text-muted-foreground z-10">Ping: 24ms (Cairo)</p>
        </div>
      </div>

      {/* Member List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 scrollbar-hide">
        {partyMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-card/80 transition-colors group relative overflow-hidden border border-transparent hover:border-border/50">
            
            {member.isSpeaking && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-full"></div>
            )}

            <div className="relative">
              <Avatar className={`w-10 h-10 ${member.isSpeaking ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-background' : ''}`}>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.username[0]}</AvatarFallback>
              </Avatar>
              {member.isLeader && (
                <div className="absolute -top-1 -right-1 text-[10px] bg-yellow-500 text-yellow-950 rounded-full w-4 h-4 flex items-center justify-center z-10 shadow-sm">
                  <Star className="w-2.5 h-2.5 fill-current" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${member.isSpeaking ? 'text-green-500' : ''}`}>{member.username}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{member.richPresence || 'In Lobby'}</span>
                {member.isReady && <Badge className="h-4 px-1 text-[8px] bg-primary/20 text-primary border-none">READY</Badge>}
              </div>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               {member.id !== '1' && member.isLeader && (
                 <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full" title="Kick">
                   <ShieldAlert className="w-3 h-3 text-destructive" />
                 </Button>
               )}
               <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full bg-secondary">
                  {member.isMuted ? <MicOffIcon className="w-3 h-3 text-destructive" /> : <MicIcon className="w-3 h-3 text-muted-foreground" />}
               </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full border-dashed gap-2 h-12 mt-4 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-all">
          <PlusIcon className="w-4 h-4" />
          Invite Friends
        </Button>
      </div>

      {/* Shared Progress Placeholder */}
      <div className="p-4 shrink-0">
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <Trophy className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
               <span>Party XP Boost</span>
               <span className="text-accent">+15%</span>
             </div>
             <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
               <div className="h-full bg-accent w-3/4"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t bg-card/80 backdrop-blur flex items-center gap-3 shrink-0">
        <Button 
          variant={isReady ? "secondary" : "default"} 
          className={`flex-1 h-12 rounded-xl text-md font-bold transition-all shadow-md ${!isReady ? 'shadow-primary/20' : ''}`}
          onClick={() => setIsReady(!isReady)}
        >
          {isReady ? 'Unready' : 'Ready Up'}
        </Button>
        <Button variant="secondary" size="icon" className="w-12 h-12 rounded-xl shrink-0">
          <MicIcon className="w-5 h-5 text-green-500" />
        </Button>
      </div>
    </div>
  );
}
