import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Heart, Flame, Sparkles } from 'lucide-react';
import pav_bhaji from '../assets/pav_bhaji.png';
import bombay_style_vadapav from '../assets/bombay_style_vadapav.png';
import pani_puri from '../assets/pani_puri.png';
import tava_pulav from '../assets/tava_pulav.png';
import dry_manchurian from '../assets/dry_manchurian.png';
import pizza from '../assets/pizza.png';

const menuItems = [
  {
    id: 1,
    title: 'Pani Puri (10 Pieces)',
    description: 'Crispy puris filled with spicy, tangy pani and mashed potatoes — the ultimate street food experience from our "Plates to Share" section.',
    image: pani_puri,
    slug: 'plates to share',
    tag: 'Bestseller',
    icon: Star,
    color: 'bg-amber-500',
  },
  {
    id: 2,
    title: 'GKC Special Pav Bhaji',
    description: 'Our signature sizzling Pav Bhaji — a rich, buttery mash of vegetables served with soft, toasted buns.',
    image: pav_bhaji,
    slug: 'gkc special pav bhaji',
    tag: 'Signature',
    icon: Sparkles,
    color: 'bg-emerald-500',
  },
  {
    id: 3,
    title: 'Bombay Style Vadapav',
    description: 'The soul of Mumbai — spiced potato fritter in soft buns with garlic chutney. A classic from our "Street Food Snacks" section.',
    image: bombay_style_vadapav,
    slug: 'street food snacks',
    tag: 'Classic',
    icon: Flame,
    color: 'bg-rose-500',
  },
  {
    id: 4,
    title: 'GKC Special Tava Pulav',
    description: 'Aromatic basmati rice stir-fried with farm-fresh vegetables and our signature Tawa masala on a sizzling griddle.',
    image: tava_pulav,
    slug: 'gkc tava pulav',
    tag: 'Soul Food',
    icon: Sparkles,
    color: 'bg-yellow-500',
  },
  {
    id: 5,
    title: 'Dry Manchurian',
    description: 'Fusion flavors from East and West — crispy vegetable balls tossed in a tangy, spicy Indo-Chinese sauce.',
    image: dry_manchurian,
    slug: 'indo chinese special',
    tag: 'Fusion',
    icon: Flame,
    color: 'bg-purple-600',
  },
  {
    id: 6,
    title: 'Kids Pizza',
    description: 'Mild and fun flavors for our younger guests — a delicious pizza loaded with cheese and kid-friendly toppings.',
    image: pizza,
    slug: 'kids special',
    tag: 'Kids Choice',
    icon: Heart,
    color: 'bg-orange-500',
  },
];

const FeaturedMenu = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      
      {/* Section Header */}
      <div className="mb-12 text-center max-w-5xl mx-auto space-y-8">
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                <Star className="h-3.5 w-3.5 fill-primary" />
                The Signature Experience
            </div>
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1]">
          Our <span className="text-gradient-primary italic pr-4">Signature</span> Creations
        </h2>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium italic opacity-80 leading-relaxed">
          "From the bustling streets of Mumbai to the rustic flavor of Kathiyawad, we bring the true soul of Indian street food to your plate."
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-card rounded-[2.5rem] overflow-hidden cursor-pointer flex flex-col transition-all duration-700 hover:-translate-y-2 border border-border/40 shadow-sm hover:shadow-2xl hover:shadow-primary/10"
            onClick={() => navigate(`/menu?category=${item.slug}`)}
          >
             {/* Image Section */}
             <div className="relative h-72 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                
                {/* Tag Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className={`flex items-center gap-2 ${item.color} px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-white shadow-xl`}>
                    <item.icon className="h-3 w-3" />
                    {item.tag}
                  </div>
                </div>
             </div>

            {/* Content Section */}
            <div className="p-10 flex flex-col flex-grow space-y-6">
                <div className="space-y-3">
                    <h3 className="text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors tracking-tight leading-none">
                        {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium italic opacity-80">
                        "{item.description}"
                    </p>
                </div>
                
                <div className="pt-6 border-t border-border/40 mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                        Explore Category
                    </span>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                        <ArrowRight className="h-5 w-5" />
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button */}
      <div className="mt-24 text-center">
         <button 
            onClick={() => navigate('/menu')}
            className="group relative inline-flex items-center gap-4 text-foreground font-extrabold uppercase tracking-[0.4em] text-xs hover:text-primary transition-colors"
         >
            Explore Full Menu
            <div className="h-12 w-12 rounded-full border border-border group-hover:border-primary group-hover:bg-primary/5 flex items-center justify-center transition-all">
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
         </button>
      </div>
    </section>
  );
};

export default FeaturedMenu;