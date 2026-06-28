import { Users, Hash, TrendingUp } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { Community } from '../../../lib/mock-data';
import { Badge } from '../../../components/ui/badge';

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border bg-card hover:shadow-lg transition-all group">
      <div className="h-24 relative overflow-hidden">
        <img 
          src={community.image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        {community.trending && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground border-none">
            <TrendingUp className="w-3 h-3 mr-1" /> Trending
          </Badge>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col -mt-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg mb-3">
          <Hash className="w-6 h-6" />
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1">{community.name}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
          <Users className="w-3 h-3" /> {community.memberCount.toLocaleString()} Members
        </p>
        
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
          {community.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <Badge variant="secondary" className="text-[10px] uppercase font-bold">{community.category}</Badge>
          <Button variant={community.isJoined ? "secondary" : "default"} size="sm">
            {community.isJoined ? 'Joined' : 'Join'}
          </Button>
        </div>
      </div>
    </div>
  );
}
