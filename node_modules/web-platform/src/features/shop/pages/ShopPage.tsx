import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_SHOP_ITEMS, CURRENT_USER } from '../../../lib/mock-data';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ShoppingBag, Coins, Diamond, Search, Sparkles } from 'lucide-react';
import { Input } from '../../../components/ui/input';

export function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'avatar_frame', label: 'Frames' },
    { id: 'banner', label: 'Banners' },
    { id: 'profile_theme', label: 'Themes' },
    { id: 'emoji_pack', label: 'Emojis' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? MOCK_SHOP_ITEMS 
    : MOCK_SHOP_ITEMS.filter(item => item.type === activeCategory);

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
      className="space-y-8 pb-12 animate-fade-in"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Shop Header & Balances */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" /> Item Shop
          </h1>
          <p className="text-muted-foreground mt-2">Customize your profile and express yourself.</p>
        </div>

        <div className="flex gap-4">
          <Card className="bg-gradient-to-tr from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 px-4 py-2 flex items-center gap-3 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Coins className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Coins</p>
              <p className="font-bold text-lg leading-none">{CURRENT_USER.coins.toLocaleString()}</p>
            </div>
            <Button size="icon" variant="ghost" className="w-6 h-6 ml-2 rounded-full">+</Button>
          </Card>

          <Card className="bg-gradient-to-tr from-accent/10 to-pink-600/10 border-accent/20 px-4 py-2 flex items-center gap-3 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Diamond className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Premium</p>
              <p className="font-bold text-lg leading-none">{CURRENT_USER.premiumCoins.toLocaleString()}</p>
            </div>
            <Button size="icon" variant="ghost" className="w-6 h-6 ml-2 rounded-full">+</Button>
          </Card>
        </div>
      </div>

      {/* Featured Banner */}
      <motion.section variants={itemVariants} className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl group flex items-center p-8 md:p-12 border border-primary/20 bg-gradient-to-br from-indigo-900 to-[#0B0F19]">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000')] bg-cover bg-left opacity-50 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-xl">
          <Badge variant="accent" className="mb-4 flex w-fit items-center gap-1"><Sparkles className="w-3 h-3"/> Featured Bundle</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-3 drop-shadow-md">Neon Nights Pack</h2>
          <p className="text-muted-foreground text-lg mb-6">Get the exclusive animated frame, banner, and profile theme in one discounted bundle.</p>
          <Button size="lg" className="shadow-[0_0_20px_rgba(0,210,255,0.4)] px-8">Buy for 1200 <Diamond className="w-4 h-4 ml-2 inline"/></Button>
        </div>
      </motion.section>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 sticky top-16 z-30 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 border-b">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Badge 
              key={cat.id} 
              variant={activeCategory === cat.id ? 'default' : 'secondary'} 
              className="px-4 py-2 text-sm cursor-pointer whitespace-nowrap hover:bg-primary/80"
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Badge>
          ))}
        </div>
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <Input className="pl-9 bg-card" placeholder="Search items..." />
        </div>
      </div>

      {/* Item Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group hover:border-primary/50 transition-all shadow-sm hover:shadow-xl flex flex-col h-full bg-card/50 backdrop-blur-sm">
            <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center p-6">
              {/* Abstract pattern background based on type */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50"></div>
              
              <img src={item.image} className={`relative z-10 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110 ${item.type === 'avatar_frame' ? 'rounded-full w-32 h-32 ring-4 ring-primary' : 'rounded-xl w-full h-full'}`} alt={item.name} />
              
              {item.isFeatured && (
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground border-none">Featured</Badge>
              )}
              {item.discount && (
                <Badge className="absolute top-2 right-2 bg-green-500 text-white border-none">-{item.discount}%</Badge>
              )}
            </div>
            
            <CardContent className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4 flex-1">{item.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center gap-1 font-bold text-lg">
                  {item.price}
                  {item.currency === 'coins' ? <Coins className="w-4 h-4 text-yellow-600" /> : <Diamond className="w-4 h-4 text-accent" />}
                </div>
                <Button variant={item.currency === 'premium' ? 'default' : 'secondary'} size="sm">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

    </motion.div>
  );
}
