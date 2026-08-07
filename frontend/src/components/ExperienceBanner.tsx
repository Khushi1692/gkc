import { ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperienceBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12">
      <div className="relative overflow-hidden rounded-[4rem] md:rounded-[5rem] bg-card border border-border/40 p-8 md:p-16 lg:p-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent z-0" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-2/5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tighter leading-[1.05]">
                Ready to <br />
                <span className="text-gradient-primary italic pr-2 mt-2 inline-block">Experience</span><br />
                the Feast?
              </h2>
              <p className="text-muted-foreground text-xl md:text-2xl font-medium max-w-lg italic opacity-80 leading-relaxed">
                "Whether it's a family gathering or a quick solo thali, we have a seat waiting for you."
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => navigate('/menu')}
                className="group h-16 px-10 rounded-2xl bg-primary text-primary-foreground font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] shadow-primary/40 hover:scale-[1.02] transition-all"
              >
                Order Online
                <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="group h-16 px-10 rounded-2xl bg-white text-foreground font-black uppercase text-xs tracking-widest flex items-center gap-3 border border-border/40 shadow-xl hover:bg-gray-50 hover:scale-[1.02] transition-all"
              >
                Find a Branch
                <MapPin className="h-5 w-5 text-primary transition-transform group-hover:-translate-y-1" />
              </button>
            </div>
            
            <div className="pt-8 flex items-center gap-12 border-t border-border/20">
                <div className="flex flex-col">
                    <span className="text-4xl font-black text-foreground tracking-tight">100%</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 text-primary">Authentic Taste</span>
                </div>
                <div className="h-12 w-px bg-border/40" />
                <div className="flex flex-col">
                    <span className="text-4xl font-black text-foreground tracking-tight">Freshly</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 text-primary">Ground Spices</span>
                </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5 relative group cursor-pointer" onClick={() => navigate('/about')}>
            <div className="relative w-full aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src="/assets/pani_puri_banner.png" 
                alt="Gopi Ka Chatka Signature Pani Puri" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-12 left-12 right-12 space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Our Spaces</span>
                  </div>
                  <p className="text-white text-3xl md:text-4xl font-extrabold tracking-tight">Heritage in the Heart of Town</p>
                  <div className="inline-flex items-center gap-3 text-white/80 text-sm font-bold uppercase tracking-widest group/link pt-2 hover:text-white transition-colors">
                      Explore Our Story <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover/link:translate-x-2" />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceBanner;
