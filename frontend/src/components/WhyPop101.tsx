import { Leaf, Heart, Flame, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: 'Pure Vegetarian',
    description: 'Every dish is crafted with the finest seasonal vegetables, legumes & hand-picked spices.',
    highlight: '100% Meat-Free',
    color: 'oklch(0.7 0.15 150)',
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
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-6">
          <ShieldCheck className="h-3 w-3" />
          Our Philosophy
        </div>
        <h2 className="text-4xl font-extrabold text-foreground md:text-5xl lg:text-6xl tracking-tight mb-6">
          The Pillars of <span className="text-primary">Quality</span>
        </h2>
        <p className="text-muted-foreground text-lg font-medium max-w-xl mx-auto italic">
          More than just a restaurant, we are a tribute to the timeless traditions of Kathiyawad.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={index}
              className="group relative rounded-[2.5rem] bg-card/40 backdrop-blur-sm border border-border p-10 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Icon Container */}
              <div 
                className={`mb-10 flex h-20 w-20 items-center justify-center rounded-3xl ${pillar.lightBg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                style={{ border: `1px solid ${pillar.color}20` }}
              >
                <Icon className="h-8 w-8" style={{ color: pillar.color }} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                  {pillar.highlight}
                </span>
                <h3 className="text-2xl font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              {/* Subtle hover pattern */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyGopiKaChatka;