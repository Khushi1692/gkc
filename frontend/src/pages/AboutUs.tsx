import { Leaf, Heart, Flame, MapPin, Truck, Milestone, ArrowRight } from 'lucide-react';
import kitchenHeroImg from '../assets/bombay_style_vadapav.png';

const values = [
  {
    icon: Leaf,
    number: '01',
    title: 'Pure Vegetarian',
    body: 'Every item on our menu is 100% vegetarian — crafted with fresh produce, whole spices, and time-honoured traditional Indian methods.',
    color: 'oklch(0.73 0.16 140)',
    bg: 'bg-emerald-50/50',
  },
  {
    icon: Heart,
    number: '02',
    title: 'Jain Friendly',
    body: 'Dedicated Jain options with no onion and no garlic — so every guest at the table can dine with full confidence and joy.',
    color: 'oklch(0.6 0.18 25)',
    bg: 'bg-rose-50/50',
  },
  {
    icon: Flame,
    number: '03',
    title: 'Generational Recipes',
    body: 'Cooked fresh daily using recipes passed down through generations in Gujarat — pure ghee and hand-ground masalas.',
    color: 'oklch(0.7 0.15 40)',
    bg: 'bg-amber-50/50',
  },
];


const AboutUs = () => {
  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-white">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div className="container mx-auto px-8 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Text Content */}
            <div className="relative z-10 space-y-12 py-20">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Our Story</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-extrabold text-foreground leading-[1.05] tracking-tighter">
                  The Heart of <br />
                  <span className="text-gradient-primary italic pr-2 mt-2 inline-block">Gopi Ka Chatka</span>
                </h1>
                
                <div className="h-1 w-24 bg-primary/20 rounded-full"></div>
              </div>

              <div className="space-y-8">
                <p className="text-muted-foreground text-2xl font-medium leading-relaxed max-w-xl italic opacity-90">
                  "Authentic Indian flavors, crafted with tradition and served with love — straight from the heart of Gujarat to Melbourne."
                </p>
                
                <div className="flex flex-wrap gap-12 pt-8">
                  <div className="space-y-1">
                    <p className="text-4xl font-black text-foreground">1980s</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">The Origin</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-black text-foreground">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Authentic</p>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <button className="group flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                  Read Our Story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </div>

            {/* Right: Visual Content */}
            <div className="relative h-[600px] lg:h-[800px] w-full">
              <div className="absolute inset-0 bg-primary/5 rounded-[4rem] -rotate-3 transition-transform duration-1000 group-hover:rotate-0"></div>
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-3xl border-8 border-white">
                <img
                  src={kitchenHeroImg}
                  alt="Gopi's Kitchen Legacy"
                  className="h-full w-full object-cover transition-transform duration-[4s] hover:scale-110"
                />
              </div>
              
              {/* Floating Decorative Elements */}
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-secondary rounded-full blur-[80px] opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 h-60 w-60 bg-primary rounded-full blur-[100px] opacity-20"></div>
            </div>

          </div>
        </div>
      </section>



      {/* ── VALUES ───────────────────────────────────── */}
      <section className="bg-mesh py-20 rounded-[5rem] border-y border-white/5">
        <div className="container mx-auto px-8 md:px-20 lg:px-32">
          <div className="mb-32 text-center max-w-4xl mx-auto space-y-8">
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                    Our Philosophy
                </div>
            </div>
            <h2 className="text-6xl font-extrabold text-foreground tracking-tighter leading-[1.1]">
              Our Promise to <span className="text-gradient-primary italic pr-2">You</span>
            </h2>
            <p className="text-muted-foreground text-xl font-medium italic opacity-80 max-w-2xl mx-auto leading-relaxed">
              Three principles that guide every dish we cook and every guest we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="group relative rounded-[3.5rem] glass-card p-12 hover:-translate-y-4 overflow-hidden"
                >
                  <span className="absolute top-10 right-10 text-9xl font-black text-foreground/[0.15] leading-none transition-all duration-700 group-hover:text-primary/[0.3] group-hover:scale-110">
                    {item.number}
                  </span>
                  
                  <div 
                    className={`mb-12 flex h-24 w-24 items-center justify-center rounded-[2.5rem] ${item.bg} border border-white/20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[15deg] shadow-xl shadow-black/5`}
                  >
                    <Icon className="h-10 w-10" style={{ color: item.color }} strokeWidth={1.2} />
                  </div>
                  
                  <h3 className="text-3xl font-black text-foreground mb-6 tracking-tight leading-none">{item.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-medium italic opacity-70 group-hover:opacity-100 transition-opacity">
                    "{item.body}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ──────────────────────────────── */}
      <section className="container mx-auto px-8 py-20 md:px-20 lg:px-32 relative overflow-hidden">
        <div className="absolute left-1/2 top-96 bottom-40 w-px bg-gradient-to-b from-primary/40 via-primary/10 to-transparent hidden lg:block" />

        <div className="text-center mb-24 space-y-8 relative z-10">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                Milestones
            </div>
          </div>
          <h2 className="text-7xl font-extrabold text-foreground tracking-tighter leading-[1.1]">
            Our <span className="text-gradient-primary italic pr-2">Journey</span>
          </h2>
          <p className="text-muted-foreground text-2xl font-medium italic opacity-60 max-w-2xl mx-auto">
            "Growing with the love of our community, one branch at a time."
          </p>
        </div>

        <div className="space-y-56 relative z-10">
          {[
            {
              id: '01',
              title: 'Clayton (2024)',
              body: 'Sleepless nights, recipe refinements, and equipment challenges. But the love from Clayton was overwhelming. Customers became family.',
              icon: Truck,
              img: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=800&auto=format&fit=crop',
              rotate: '-rotate-2',
              side: 'left',
              tag: 'The Beginning',
            },
            {
              id: '02',
              title: 'Hawthorn',
              body: 'Expanding our roots to Hawthorn. New neighbors, same authentic soul. We’re bringing Gopi’s secrets to every corner of the city.',
              icon: Heart,
              img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
              rotate: 'rotate-2',
              side: 'right',
              tag: 'Expansion',
            },
            {
              id: '03',
              title: 'St. Kilda',
              body: 'Bringing the vibrant flavors of India to the iconic streets of St. Kilda. A new chapter in sharing our generational recipes.',
              icon: Milestone,
              img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
              rotate: '-rotate-2',
              side: 'left',
              tag: 'Growth',
            },
            {
              id: '04',
              title: 'Clyde North',
              body: 'Our newest destination. We continue to spread the love of pure, home-style cooking to the wonderful community of Clyde North.',
              icon: MapPin,
              img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
              rotate: 'rotate-2',
              side: 'right',
              tag: 'Latest Branch',
            }
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-40 w-full ${item.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Content Card */}
              <div className="w-full max-w-xl p-12 lg:p-16 glass-card rounded-[3.5rem] relative hover:scale-[1.02] transition-transform duration-700 group">
                <div className="absolute -top-10 left-12 flex items-center justify-center h-20 w-20 rounded-full bg-primary text-primary-foreground font-black text-xl shadow-2xl z-20 ring-8 ring-background">
                  {item.id}
                </div>
                
                <div className="space-y-8 pt-6">
                  <div className="flex items-center gap-4">
                    <item.icon className="h-6 w-6 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">{item.tag}</span>
                  </div>
                  <h4 className="text-5xl font-black text-foreground tracking-tighter leading-none">{item.title}</h4>
                  <p className="text-muted-foreground text-xl leading-relaxed font-medium italic opacity-80">
                    "{item.body}"
                  </p>
                </div>
              </div>

              {/* Polaroid Image */}
              <div className={`w-full max-w-md p-6 pb-20 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] ${item.rotate} transition-all duration-1000 hover:rotate-0 hover:scale-105 group relative`}>
                <div className="overflow-hidden bg-muted aspect-square mb-8 rounded-sm">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                </div>
                <div className="px-4 space-y-3">
                  <div className="h-2 w-1/3 bg-primary/20 rounded-full" />
                  <div className="h-2 w-1/2 bg-secondary/40 rounded-full" />
                </div>
                {/* Decorative Tape */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-primary/10 backdrop-blur-md rounded-lg rotate-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING BANNER ───────────────────────────── */}
      <section className="px-8 py-10 pb-16 selection:bg-black/20 selection:text-white">
        <div className="container mx-auto max-w-6xl rounded-[4rem] bg-primary relative overflow-hidden shadow-2xl shadow-primary/30 group">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]" />
          
          <div className="relative z-10 py-16 px-12 text-center space-y-10">
            <div className="space-y-6">
              <span className="text-primary-foreground/60 text-[10px] font-extrabold uppercase tracking-[0.5em]">Gopi ka Chatka</span>
              <h2 className="text-5xl md:text-8xl font-extrabold text-primary-foreground tracking-tighter leading-[1]">
                Authentic Indian Food,<br />
                <span className="italic text-white">Made with Love.</span>
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 border-t border-white/10 pt-16">
              <div className="flex flex-col items-center">
                <span className="text-primary-foreground/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Locations</span>
                <span className="text-primary-foreground text-2xl font-black tracking-tight">Growing Daily</span>
              </div>
              <div className="hidden md:block h-16 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-primary-foreground/40 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Flavors</span>
                <span className="text-primary-foreground text-2xl font-black tracking-tight">Truly Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;