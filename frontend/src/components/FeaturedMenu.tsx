import classicBurger from '@/assets/classic-burger.png';
import creamyPasta from '@/assets/creamy-pasta.png';
import crispyFries from '@/assets/crispy-fries.png';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    id: 1,
    title: 'Classic Burger',
    description: 'Juicy beef patty with fresh toppings',
    image: classicBurger,
    slug: 'burger',
  },
  {
    id: 2,
    title: 'Creamy Pasta',
    description: 'Rich and creamy pasta with your choice of sauce',
    image: creamyPasta,
    slug: 'pasta',
  },
  {
    id: 3,
    title: 'Crispy Fries',
    description: 'Perfectly seasoned and crispy fries',
    image: crispyFries,
    slug: 'fries',
  },
];

const FeaturedMenu = () => {
  const navigate = useNavigate();
  return (
    <section
      id="menu"
      className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl"
    >
      <h2 className="mb-8 text-3xl font-bold md:text-4xl">Featured Menu Items</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer"
            onClick={() => {
              navigate(`/menu?category=${item.slug}`);
            }}
          >
            <div className="mb-4 aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[16/12] lg:aspect-square">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground text-lg">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMenu;
