import { Utensils, Wheat, Leaf, Users } from 'lucide-react';
import heritageImg from '../assets/kathiyawadi_heritage_v2.png';

const stats = [
  {
    icon: Utensils,
    title: 'Authentic Spices',
    description: 'Directly sourced from the heart of Kathiyawad for that genuine local flavor.',
  },
  {
    icon: Wheat,
    title: 'Stone-Ground',
    description: 'We believe in the power of stone grinding to preserve natural oils and bold aromas.',
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
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        </div>

        {/* Visual Content */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl group border-8 border-card/40">
            <img
              src={heritageImg}
              alt="Kathiyawadi Heritage"
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 glass p-10 rounded-[3rem] shadow-2xl border-white/20 hidden lg:block animate-float">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-2 w-12 bg-primary rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">The Secret</span>
            </div>
            <p className="text-4xl font-extrabold text-foreground tracking-tighter leading-none">Gopi's <br /><span className="text-primary italic">Masala</span></p>
          </div>

          {/* Additional Decorative Element */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full border border-primary/20 border-dashed animate-[spin_20s_linear_infinite] hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default TraditionSection;
