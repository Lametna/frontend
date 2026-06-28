export function GamesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-display font-bold">Game Library</h1>
      <p className="text-muted-foreground">Discover new games or jump back into your favorites.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
         {Array.from({length: 10}).map((_, i) => (
           <div key={i} className="aspect-[3/4] bg-muted rounded-xl relative group overflow-hidden cursor-pointer">
              <img src={`https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&auto=format&fit=crop&sig=${i+10}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">Play Now</div>
              </div>
           </div>
         ))}
      </div>
    </div>
  )
}
