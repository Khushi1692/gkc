import { useNavigate } from 'react-router-dom';

const menuItems = [
  { id: 1, title: 'Classic Burger', description: 'Fresh petty burgers with fresh toppings', image: 'https://pop101.com.au/uploads/home-burger.webp', slug: 'burger' },
  { id: 2, title: 'Creamy Pasta', description: 'Rich and creamy pasta with your choice of sauce', image: 'https://pop101.com.au/uploads/home-pasta.webp', slug: 'pasta' },
  { id: 3, title: 'Crispy Fries', description: 'Perfectly seasoned and crispy fries', image: 'https://pop101.com.au/uploads/home-fries.webp', slug: 'fries' },
];

const FeaturedMenu = () => {
  const navigate = useNavigate();
  return (
    <section id="menu" className="w-full">
      <h2 className="font-bungee mb-12 text-center text-4xl uppercase text-foreground md:text-6xl">
        Featured <span className="text-primary">Menu</span>
      </h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer rounded-2xl border-4 border-border bg-card p-4 shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:shadow-[8px_8px_0px_0px_var(--border)]"
            onClick={() => navigate(`/menu?category=${item.slug}`)}
          >
            <div className="mb-6 aspect-square overflow-hidden rounded-xl border-2 border-border bg-muted">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover scale-103 transition-transform duration-500 hover:scale-110"
              />
            </div>
            <h3 className="font-bungee mb-2 text-2xl uppercase tracking-tight">{item.title}</h3>
            <p className="font-bold text-foreground/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMenu;