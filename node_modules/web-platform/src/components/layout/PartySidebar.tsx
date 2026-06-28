import { Mic as MicIcon, MicOff as MicOffIcon, Settings as SettingsIcon, X as XIcon, Plus as PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAppStore } from '../../store/app';

const MOCK_PARTY_MEMBERS = [
  { id: 1, name: 'Ahmed', isSpeaking: true, isMuted: false, isLeader: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed' },
  { id: 2, name: 'Sara', isSpeaking: false, isMuted: true, isLeader: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara' },
  { id: 3, name: 'Omar', isSpeaking: false, isMuted: false, isLeader: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar' },
];

export function PartySidebar() {
  const { t } = useTranslation();
  const { toggleParty } = useAppStore();

  return (
    <div className="flex flex-col h-full bg-secondary/30 relative">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg leading-none">Your Party</h3>
          <p className="text-xs text-muted-foreground mt-1">In Lobby • 3/8</p>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleParty}>
          <XIcon className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {MOCK_PARTY_MEMBERS.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-card/50 transition-colors group">
            <div className="relative">
              <Avatar className={`w-10 h-10 ${member.isSpeaking ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              {member.isLeader && (
                <div className="absolute -top-1 -right-1 text-[10px] bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center z-10">★</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {member.isMuted ? 'Muted' : 'Online'}
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
               <Button variant="ghost" size="icon" className="w-8 h-8">
                  {member.isMuted ? <MicOffIcon className="w-4 h-4 text-destructive" /> : <MicIcon className="w-4 h-4" />}
               </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full border-dashed gap-2 h-12 mt-4 text-muted-foreground hover:text-foreground">
          <PlusIcon className="w-4 h-4" />
          Invite Friend
        </Button>
      </div>

      <div className="p-4 border-t bg-card/50 backdrop-blur flex items-center gap-2">
        <Button variant="default" className="flex-1 gap-2">
          Ready Up
        </Button>
        <Button variant="secondary" size="icon" className="shrink-0">
          <SettingsIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
