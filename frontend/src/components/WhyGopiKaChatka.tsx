import { Leaf, Heart, Flame, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: 'Pure Vegetarian',
    description: 'Every dish is crafted with the finest seasonal vegetables, legumes & hand-picked spices.',
    highlight: '100% Meat-Free',
    color: 'oklch(0.7 0.15 140)',
    lightBg: 'bg-emerald-50/50',
  },
  {
    icon: Heart,
    title: 'Jain Friendly',
    description: 'Dedicated menu options without onion or garlic, prepared with utmost care and devotion.',
    highlight: 'Pure Traditions',
    color: 'oklch(0.7 0.15 20)',
    lightBg: 'bg-rose-50/50',
  },
  {
    icon: Flame,
    title: 'Authentic Soul',
    description: 'Generational recipes from Gujarat, slow-cooked with pure ghee and rustic masalas.',
    highlight: 'Gujarat Heritage',
    color: 'oklch(0.7 0.15 40)',
    lightBg: 'bg-amber-50/50',
  },
];

const WhyGopiKaChatka = () => {
  return (
    <section className="relative py-12">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <div className="mb-12 text-center max-w-4xl mx-auto space-y-8">
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                <ShieldCheck className="h-4 w-4" />
                The GKC Promise
            </div>
        </div>
        <h2 className="text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl tracking-tight mb-6">
          The Pillars of <span className="text-primary italic pr-2">Quality</span>
        </h2>
        <p className="text-muted-foreground text-xl font-medium max-w-xl mx-auto italic opacity-80 leading-relaxed">
          "More than just a restaurant, we are a tribute to the timeless traditions of Kathiyawad."
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={index}
              className="group relative rounded-[3.5rem] glass-card p-12 hover:-translate-y-4 overflow-hidden shadow-2xl"
            >
              {/* Decorative Number */}
              <span className="absolute top-10 right-10 text-8xl font-extrabold text-foreground/[0.08] leading-none transition-all duration-700 group-hover:text-primary/10 group-hover:scale-110">
                0{index + 1}
              </span>

              {/* Icon Container */}
              <div 
                className={`mb-12 flex h-24 w-24 items-center justify-center rounded-[2.5rem] ${pillar.lightBg} border border-white/20 transition-all duration-700 group-hover:scale-110 group-hover:rotate-[15deg] group-hover:shadow-2xl shadow-xl shadow-black/5`}
              >
                <Icon className="h-10 w-10" style={{ color: pillar.color }} strokeWidth={1.2} />
              </div>

              {/* Content */}
              <div className="space-y-6 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                  {pillar.highlight}
                </span>
                <h3 className="text-3xl font-extrabold text-foreground tracking-tight leading-none">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed font-medium italic opacity-70 group-hover:opacity-100 transition-opacity">
                  "{pillar.description}"
                </p>
              </div>

              {/* Gradient hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyGopiKaChatka;