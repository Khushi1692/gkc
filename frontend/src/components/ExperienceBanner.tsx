import { ArrowRight, UtensilsCrossed, ShoppingBag, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperienceBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[4rem] bg-card border border-border/40 shadow-2xl p-10 md:p-20">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-7xl font-extrabold text-foreground tracking-tighter leading-[1] uppercase">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic">Experience</span><br />
              Kathiyawad?
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-lg italic opacity-80">
              "Whether it's a family gathering or a quick solo thali, we have a seat waiting for you."
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => navigate('/menu')}
              className="group h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              Order Online
              <ShoppingBag className="h-5 w-5 transition-transform group-hover:rotate-12" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="group h-16 px-10 rounded-2xl bg-secondary text-secondary-foreground font-black uppercase text-xs tracking-widest flex items-center gap-3 border border-border/40 hover:bg-card hover:scale-[1.02] transition-all"
            >
              Find a Branch
              <MapPin className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
          
          <div className="pt-10 flex items-center gap-12 border-t border-border/10">
              <div className="flex flex-col">
                  <span className="text-3xl font-black text-foreground tracking-tight">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Authentic Taste</span>
              </div>
              <div className="h-10 w-px bg-border/20" />
              <div className="flex flex-col">
                  <span className="text-3xl font-black text-foreground tracking-tight">Freshly</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Ground Spices</span>
              </div>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={() => navigate('/about')}>
          <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format" 
              alt="Restaurant Interior" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-10 left-10 space-y-2">
                <span className="text-primary text-[10px] font-black uppercase tracking-widest">Our Spaces</span>
                <p className="text-white text-3xl font-bold tracking-tight">Heritage in Heart of Town</p>
                <div className="flex items-center gap-2 text-white/60 text-sm font-semibold group/link">
                    Explore Our Story <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </div>
            </div>
          </div>
          
          {/* Floating Element */}
          <div className="absolute top-10 -right-10 glass p-6 rounded-[1.5rem] shadow-xl border-white/40 hidden xl:block animate-float">
            <UtensilsCrossed className="h-10 w-10 text-primary mb-2" />
            <p className="text-xs font-bold leading-tight uppercase font-black tracking-widest">Est. Traditions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceBanner;
