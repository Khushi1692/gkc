import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Heart, Flame, Sparkles } from 'lucide-react';

const menuItems = [
  {
    id: 1,
    title: 'Signature Pani Puri',
    description: 'Crispy hollow puris filled with spiced potato mash and tangy herb-infused water — the ultimate street food experience.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    slug: 'plates to share',
    tag: 'Bestseller',
    icon: <Star className="h-3 w-3" />,
    color: 'bg-amber-500',
  },
  {
    id: 2,
    title: 'GKC Special Pav Bhaji',
    description: 'A rich, buttery mash of seasonal vegetables and secret spices, served with soft, toasted buns and a dollop of pure ghee.',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&auto=format&fit=crop&q=80',
    slug: 'gkc special pav bhaji',
    tag: 'Signature',
    icon: <Sparkles className="h-3 w-3" />,
    color: 'bg-emerald-500',
  },
  {
    id: 3,
    title: 'Viral UFO Burger',
    description: "Our legendary sealed burger with Kathiyawadi spiced toppings, perfectly toasted into a unique flying saucer shape.",
    image: 'https://pop101.com.au/uploads/ufo-blog.webp',
    slug: 'street food snacks',
    tag: 'Trending',
    icon: <Flame className="h-3 w-3" />,
    color: 'bg-orange-600',
  },
  {
    id: 4,
    title: 'Kathiyawadi Dabeli',
    description: 'The iconic Gujarati street snack — spiced potato filling in a soft bun, topped with pomegranate, peanuts, and sev.',
    image: 'https://images.unsplash.com/photo-1634595861118-2ba4025d0315?w=600&auto=format&fit=crop&q=80',
    slug: 'street food snacks',
    tag: 'Heritage',
    icon: <Heart className="h-3 w-3" />,
    color: 'bg-purple-600',
  },
  {
    id: 5,
    title: 'Mumbai Style Vadapav',
    description: 'The soul of Mumbai — a spiced potato fritter sandwiched between soft buns with spicy garlic chutney.',
    image: 'https://images.unsplash.com/photo-1626132646529-5aa743fddc1b?w=600&auto=format&fit=crop&q=80',
    slug: 'street food snacks',
    tag: 'Classic',
    icon: <Flame className="h-3 w-3" />,
    color: 'bg-rose-500',
  },
  {
    id: 6,
    title: 'GKC Special Tava Pulav',
    description: 'Aromatic basmati rice stir-fried with farm-fresh vegetables and our signature Tawa masala on a sizzling griddle.',
    image: 'https://images.unsplash.com/photo-1631515223380-c1272658f221?w=600&auto=format&fit=crop&q=80',
    slug: 'gkc tava pulav',
    tag: 'Soul Food',
    icon: <Sparkles className="h-3 w-3" />,
    color: 'bg-yellow-500',
  },
];

const FeaturedMenu = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12">
      {/* Section Header */}
      <div className="mb-20 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
          <Star className="h-3 w-3 fill-primary" />
          The GKC Experience
        </div>
        <h2 className="text-5xl font-extrabold text-foreground md:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
          Our <span className="text-primary italic">Signature</span> Creations
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium italic">
          "From the bustling streets of Mumbai to the rustic flavor of Kathiyawad, we bring the true taste of Indian street food to your plate."
        </p>

      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-card rounded-[2.5rem] border border-border/40 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-lg"
            onClick={() => navigate(`/menu?category=${item.slug}`)}
          >
            {/* Tag Badge - Refined Design */}
            <div className="absolute top-6 right-6 z-20">
              <div className={`flex items-center gap-1.5 ${item.color} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg`}>
                {item.icon}
                {item.tag}
              </div>
            </div>

            {/* Image Section */}
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 px-10 py-10 space-y-4">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 font-medium italic opacity-80">
                "{item.description}"
              </p>
              
              <div className="pt-8 border-t border-border/10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
                  Explore Heritage
                </span>
                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMenu;