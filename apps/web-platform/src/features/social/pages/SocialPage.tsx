import { useState } from 'react';

import { Search, Plus, Filter, MessageSquare, Users, Hash } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { EXTENDED_USERS, MOCK_CONVERSATIONS, MOCK_COMMUNITIES } from '../../../lib/mock-data';

import { FriendCard } from '../components/FriendCard';
import { MessageArea } from '../components/MessageArea';
import { CommunityCard } from '../components/CommunityCard';

export function SocialPage() {
  const [activeTab, setActiveTab] = useState<'messages' | 'friends' | 'communities'>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  
  // For Messages Tab
  const [activeConversationId, setActiveConversationId] = useState(MOCK_CONVERSATIONS[0].id);
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId)!;
  const otherUserId = activeConversation.participants.find(id => id !== '1')!;
  const otherUser = EXTENDED_USERS.find(u => u.id === otherUserId)!;

  // Filtered Data
  const filteredFriends = EXTENDED_USERS.filter(u => u.id !== '1' && u.username.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredConversations = MOCK_CONVERSATIONS.filter(c => {
    const otherId = c.participants.find(id => id !== '1');
    const u = EXTENDED_USERS.find(u => u.id === otherId);
    return u?.username.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const filteredCommunities = MOCK_COMMUNITIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-fade-in pb-12 md:pb-0">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-80 flex flex-col bg-card rounded-2xl border shadow-sm overflow-hidden flex-shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-display font-bold">Social</h1>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex bg-secondary p-1 rounded-xl mb-4">
            <button 
              className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'messages' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare className="w-4 h-4" /> <span className="hidden sm:inline">Chat</span>
            </button>
            <button 
              className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'friends' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('friends')}
            >
              <Users className="w-4 h-4" /> <span className="hidden sm:inline">Friends</span>
            </button>
            <button 
              className={`flex-1 text-sm font-medium py-1.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'communities' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('communities')}
            >
              <Hash className="w-4 h-4" /> <span className="hidden sm:inline">Clubs</span>
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                className="pl-9 bg-background h-10 border-none shadow-sm" 
                placeholder={`Search ${activeTab}...`} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 h-10 w-10">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activeTab === 'messages' && (
            <div className="p-2 space-y-1">
              {filteredConversations.map(convo => {
                const uid = convo.participants.find(id => id !== '1')!;
                const u = EXTENDED_USERS.find(user => user.id === uid)!;
                return (
                  <div 
                    key={convo.id}
                    onClick={() => setActiveConversationId(convo.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${activeConversationId === convo.id ? 'bg-primary/10' : 'hover:bg-secondary/50'}`}
                  >
                    <div className="relative">
                      <img src={u.avatar} className="w-12 h-12 rounded-full object-cover" />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${u.status === 'offline' ? 'bg-muted-foreground' : 'bg-green-500'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p className={`font-bold text-sm truncate ${activeConversationId === convo.id ? 'text-primary' : ''}`}>{u.username}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">10:42 AM</p>
                      </div>
                      <p className={`text-xs truncate ${convo.unreadCount > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                        Sent a message...
                      </p>
                    </div>
                    {convo.unreadCount > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
                        {convo.unreadCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="p-2">
              <div className="mb-2 px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Online ({filteredFriends.filter(f=>f.status!=='offline').length})</div>
              <div className="space-y-1 mb-4">
                {filteredFriends.filter(f => f.status !== 'offline').map(friend => (
                  <FriendCard key={friend.id} user={friend} onMessage={() => {
                    const existingConvo = MOCK_CONVERSATIONS.find(c => c.participants.includes(friend.id));
                    if (existingConvo) {
                      setActiveConversationId(existingConvo.id);
                      setActiveTab('messages');
                    }
                  }} />
                ))}
              </div>
              <div className="mb-2 px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Offline ({filteredFriends.filter(f=>f.status==='offline').length})</div>
              <div className="space-y-1 opacity-60 hover:opacity-100 transition-opacity">
                {filteredFriends.filter(f => f.status === 'offline').map(friend => (
                  <FriendCard key={friend.id} user={friend} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communities' && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold">Discover</h3>
                <a href="#" className="text-xs text-primary font-bold hover:underline">See All</a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                {filteredCommunities.slice(0,10).map(comm => (
                  <CommunityCard key={comm.id} community={comm} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-card rounded-2xl border shadow-sm overflow-hidden hidden md:flex flex-col">
        {activeTab === 'messages' ? (
          <>
            <div className="h-16 border-b flex items-center justify-between px-6 bg-card shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <img src={otherUser.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <h2 className="font-bold flex items-center gap-2">
                    {otherUser.username}
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </h2>
                  <p className="text-xs text-muted-foreground">{otherUser.richPresence || 'Online'}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:flex">View Profile</Button>
            </div>
            <MessageArea conversation={activeConversation} otherUser={otherUser} />
          </>
        ) : activeTab === 'friends' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-card to-secondary/20">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-2">Connect with Friends</h2>
            <p className="text-muted-foreground max-w-sm mb-8">Search for friends using their Gamertag or link your social accounts to find people you know.</p>
            <Button size="lg" className="px-8 shadow-lg shadow-primary/20">Add New Friend</Button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
             <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-accent to-pink-600 mb-8 p-8 flex flex-col justify-end relative overflow-hidden shadow-xl">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80')] bg-cover mix-blend-overlay opacity-30"></div>
               <Badge className="w-fit mb-2 bg-black/40 border-none text-white backdrop-blur">Trending</Badge>
               <h2 className="text-4xl font-display font-bold text-white mb-2">Cairo Nights Esports</h2>
               <p className="text-white/80">Join the largest competitive racing community in MENA.</p>
             </div>
             
             <h3 className="font-bold text-lg mb-4">Your Communities</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredCommunities.filter(c => c.isJoined).map(comm => (
                  <CommunityCard key={comm.id} community={comm} />
                ))}
             </div>
          </div>
        )}
      </div>

    </div>
  )
}
