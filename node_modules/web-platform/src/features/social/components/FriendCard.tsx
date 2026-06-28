import type { User } from '../../../lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { MoreVertical, Gamepad2, MessageSquare } from 'lucide-react';


interface FriendCardProps {
  user: User;
  onMessage?: () => void;
}

export function FriendCard({ user, onMessage }: FriendCardProps) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors group">
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card ${user.status === 'offline' ? 'bg-muted-foreground' : user.status === 'in-game' ? 'bg-purple-500' : 'bg-green-500'}`}></span>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate flex items-center gap-2">
          {user.username}
          {user.level > 80 && <span className="text-[10px] bg-accent text-accent-foreground px-1.5 rounded-full">Pro</span>}
        </h4>
        <p className="text-xs text-muted-foreground truncate">
          {user.richPresence || (user.status === 'online' ? 'Online' : 'Offline')}
        </p>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={onMessage}>
          <MessageSquare className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <Gamepad2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
}
