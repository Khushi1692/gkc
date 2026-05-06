import { Utensils, Flame, Leaf, Users } from 'lucide-react';

const stats = [
  {
    icon: Utensils,
    title: 'Authentic Spices',
    description: 'Directly sourced from the heart of Kathiyawad for that genuine local flavor.',
  },
  {
    icon: Flame,
    title: 'Hand-Crafted Masala',
    description: 'We believe in freshly hand-crafted masalas to preserve natural oils and bold aromas.',
  },
  {
    icon: Leaf,
    title: 'Farm to Plate',
    description: 'Seasonal vegetables handpicked daily to ensure every thali is a garden-fresh delight.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'More than a restaurant, we are a gathering place for the Kathiyawadi family.',
  },
];

const TraditionSection = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>

      {/* Centered Heading */}
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em]">Our Heritage</span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1]">
          The Soul of <span className="text-gradient-primary italic pr-4">Kathiyawadi</span> Tradition
        </h2>
        <p className="text-muted-foreground text-xl font-medium leading-relaxed italic opacity-80 max-w-2xl">
          "We don't just cook food; we recreate memories of Gopi's kitchen in every single bite."
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div key={i} className="group p-8 rounded-[2rem] glass-card">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
              <item.icon className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-extrabold text-foreground mb-3 tracking-tight">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TraditionSection;

