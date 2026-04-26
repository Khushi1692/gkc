import { Utensils, Wheat, Leaf, Users } from 'lucide-react';

const stats = [
  {
    icon: Utensils,
    title: 'Authentic Spices',
    description: 'Directly sourced from the heart of Kathiyawad for that genuine local flavor.',
  },
  {
    icon: Wheat,
    title: 'Hand-Ground Masalas',
    description: 'We believe in the power of gravity-fed stone grinding to preserve natural oils.',
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
    <section className="relative overflow-hidden py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
              The Soul of <span className="text-primary italic">Kathiyawadi</span> Tradition
            </h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed italic">
              "We don't just cook food; we recreate memories of Gopi's kitchen in every bite."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((item, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-secondary/30 border border-border/40 hover:bg-card hover:shadow-xl transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format"
              alt="Kathiyawadi Spices"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Decorative Badge */}
          <div className="absolute -bottom-8 -right-8 glass p-8 rounded-[2.5rem] shadow-xl border-white/40 hidden lg:block animate-float">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Our Secret</p>
            <p className="text-3xl font-extrabold text-foreground">Gopi's <br />Masala</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TraditionSection;
