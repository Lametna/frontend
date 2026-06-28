import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export function HomePage() {

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="relative w-full h-64 rounded-2xl overflow-hidden glass shadow-2xl flex items-end p-8 bg-gradient-to-tr from-indigo-900 to-purple-900">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="relative z-10 w-full flex justify-between items-end">
           <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Welcome to Season 1</h1>
              <p className="text-white/80 mt-2 max-w-md">Unlock exclusive rewards and climb the new leaderboards. The night is young.</p>
           </div>
           <Button variant="default" size="lg" className="hidden sm:flex shadow-[0_0_20px_rgba(0,210,255,0.5)]">
             View Battlepass
           </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-semibold mb-4">Continue Playing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
             <Card key={i} className="group cursor-pointer hover:border-primary/50 transition-colors">
               <div className="h-32 bg-muted rounded-t-xl overflow-hidden relative">
                 <img src={`https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=600&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Game cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <Badge className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md border-none">12 Friends Playing</Badge>
               </div>
               <CardHeader className="p-4 pb-0">
                 <CardTitle className="text-lg">Tarneeb Masters</CardTitle>
               </CardHeader>
               <CardContent className="p-4 pt-2 flex justify-between items-center">
                 <p className="text-sm text-muted-foreground">Rank: Diamond II</p>
                 <Button variant="secondary" size="sm">Play</Button>
               </CardContent>
             </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// Minimal placeholder component since we don't have Badge built specifically to export default yet, assuming it's available from ui/badge
import { Badge } from '../../../components/ui/badge';
