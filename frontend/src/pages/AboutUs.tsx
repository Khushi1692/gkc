import { Leaf, Heart, Flame, Sparkles, History, MapPin, Truck, Milestone } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    number: '01',
    title: 'Pure Vegetarian',
    body: 'Every item on our menu is 100% vegetarian — crafted with fresh produce, whole spices, and time-honoured Kathiyawadi methods.',
    color: 'oklch(0.7 0.15 150)',
    bg: 'bg-emerald-50/50',
  },
  {
    icon: Heart,
    number: '02',
    title: 'Jain Friendly',
    body: 'Dedicated Jain options with no onion and no garlic — so every guest at the table can dine with full confidence and joy.',
    color: 'oklch(0.7 0.15 20)',
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
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden rounded-b-[4rem] shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400&auto=format&fit=crop&q=85"
          alt="Authentic Kathiyawadi thali"
          className="absolute inset-0 h-full w-full object-cover scale-105 animate-[ken-burns_25s_ease-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-32 px-6 md:px-20 lg:px-32">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] animate-[fade-in_1s_ease-out]">
              <History className="h-3 w-3" />
              Our Legacy
            </div>
            <h1 className="text-white text-6xl font-extrabold leading-[1.05] tracking-tight md:text-8xl animate-[slide-up_1.2s_ease-out]">
              Born From <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Gopi's Kitchen</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl animate-[slide-up_1.4s_ease-out]">
              A family love affair with Kathiyawadi food that traveled from the heart of Gujarat to the streets of Melbourne.
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-32 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 items-center">
          <div className="space-y-12 animate-[slide-up_1s_ease-out]">
            <div className="space-y-6">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Our Roots</span>
              <h2 className="text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
                It Started at the<br />Family Table
              </h2>
            </div>
            
            <div className="space-y-8 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>
                Gopi ka Chatka was not born in a boardroom. It was born at home — over a steaming
                Kathiyawadi thali that had the whole family silent in appreciation.
              </p>
              <p>
                Gopi's recipes, passed down through generations, carry the soul of a region
                known for its bold spices and the art of cooking with pure ghee.
              </p>
              <div className="relative p-10 rounded-[2.5rem] bg-secondary/50 border border-border overflow-hidden group shadow-inner">
                <blockquote className="relative z-10 text-foreground text-xl font-bold italic leading-relaxed">
                  "Why should Melbourne not have access to truly authentic Kathiyawadi food?"
                </blockquote>
                <Sparkles className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <p>
                That question became a food truck in Clayton. The same heart-driven food —
                deeply rooted in Kathiyawad, made fresh every single day.
              </p>
            </div>
          </div>

          <div className="relative lg:pl-12 animate-[scale-up_1s_ease-out]">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&auto=format&fit=crop&q=85"
                alt="Kathiyawadi home-style cooking"
                className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Experience Badge - Simplified */}
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[2rem] shadow-xl hidden md:block animate-float border-white/40">
              <div className="flex items-center gap-4">
                <div className="h-14 w-1 flex bg-primary rounded-full" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Hand-Picked</p>
                  <p className="text-4xl font-extrabold text-foreground">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="bg-secondary/30 py-32 rounded-[4rem]">
        <div className="container mx-auto px-6 md:px-20 lg:px-32">
          <div className="mb-24 text-center max-w-3xl mx-auto space-y-6">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Our Core Values</span>
            <h2 className="text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Our Promise to You
            </h2>
            <p className="text-muted-foreground text-lg font-medium italic">
              Three principles that guide every dish we cook and every guest we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="group relative rounded-[3rem] bg-card border border-border/40 p-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden shadow-sm"
                >
                  {/* Decorative background number */}
                  <span className="absolute top-8 right-8 text-8xl font-black text-foreground/[0.08] leading-none transition-transform duration-700 group-hover:scale-110 group-hover:text-primary/10">
                    {item.number}
                  </span>
                  
                  <div 
                    className={`mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] ${item.bg} border border-white/20 shadow-xl transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className="h-8 w-8" style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed font-medium relative z-10 italic">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ──────────────────────────────── */}
      <section className="container mx-auto px-6 py-32 md:px-20 lg:px-32 relative overflow-hidden">
        {/* Background Decorative Line */}
        <div className="absolute left-[50%] top-64 bottom-32 w-px border-l-2 border-dashed border-border/60 hidden lg:block" />

        <div className="text-center mb-32 space-y-6 relative z-10">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Milestones</span>
          <h2 className="text-6xl font-extrabold text-foreground tracking-tight">
            Our Journey
          </h2>
          <p className="text-muted-foreground text-xl font-medium italic max-w-2xl mx-auto">
            "Every mile traveled is a flavor discovered."
          </p>
        </div>

        {/* Polaroid/Journal Layout */}
        <div className="space-y-40 relative z-10">
          {[
            {
              id: '01',
              title: 'Clayton (2024)',
              body: 'Sleepless nights, recipe refinements, and equipment challenges. But the love from Clayton was overwhelming. Customers became family.',
              icon: Truck,
              img: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=600&auto=format&fit=crop',
              rotate: '-rotate-2',
              side: 'left',
              tag: 'The Beginning',
            },
            {
              id: '02',
              title: 'Truganina',
              body: 'This wasn’t just expansion. It was proof that people truly wanted something different — vegetarian, flavour-driven, and made with heart.',
              icon: MapPin,
              img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
              rotate: 'rotate-1',
              side: 'right',
              tag: 'Expansion',
            },
            {
              id: '03',
              title: 'The Future',
              body: 'New locations, new neighbors, same authentic soul. We’re bringing Gopi’s secrets to every corner of Melbourne and beyond.',
              icon: Milestone,
              img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop',
              rotate: '-rotate-1',
              side: 'left',
              tag: 'Next Chapter',
            },
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full ${item.side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Journal Card */}
              <div className={`w-full max-w-lg p-10 lg:p-14 bg-card rounded-2xl shadow-2xl border border-border/50 relative hover:scale-[1.02] transition-transform duration-500 group`}>
                {/* ID Number Pin */}
                <div className="absolute -top-6 left-10 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-black text-sm shadow-xl z-20">
                  {item.id}
                </div>
                
                {/* Decorative Tape */}
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-primary/20 backdrop-blur-md rounded-full rotate-2 z-10`} />

                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{item.tag}</span>
                  </div>
                  <h4 className="text-4xl font-extrabold text-foreground tracking-tighter">{item.title}</h4>
                  <p className="text-muted-foreground text-lg leading-relaxed font-medium italic opacity-80">
                    "{item.body}"
                  </p>
                </div>
              </div>

              {/* Visual Node */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 z-20">
                  <item.icon className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>

              {/* Polaroid Image */}
              <div className={`w-full max-w-sm p-4 pb-16 bg-white shadow-2xl ${item.rotate} transition-all duration-700 hover:rotate-0 hover:scale-105 group`}>
                <div className="overflow-hidden bg-muted aspect-square mb-6">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="px-2">
                  <div className="h-2 w-1/3 bg-primary/10 rounded-full mb-2" />
                  <div className="h-2 w-1/2 bg-secondary rounded-full opacity-30" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING BANNER ───────────────────────────── */}
      <section className="px-6 py-12 pb-24">
        <div className="container mx-auto max-w-5xl rounded-[3.5rem] bg-primary relative overflow-hidden shadow-2xl shadow-primary/20">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />
          
          <div className="relative z-10 py-20 px-10 text-center space-y-8">
            <div className="space-y-4">
              <span className="text-primary-foreground text-[10px] font-black uppercase tracking-[0.4em] opacity-70">Gopi ka Chatka</span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-primary-foreground tracking-tight leading-[1.1]">
                Kathiyawadi Food,<br />Made with Love.
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 border-t border-primary-foreground/20 pt-10">
              <div className="flex flex-col items-center">
                <span className="text-primary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-1">locations</span>
                <span className="text-primary-foreground text-xl font-bold">Growing Daily</span>
              </div>
              <div className="h-px w-10 md:h-10 md:w-px bg-primary-foreground/20" />
              <div className="flex flex-col items-center">
                <span className="text-primary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-1">flavors</span>
                <span className="text-primary-foreground text-xl font-bold">Truly Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;