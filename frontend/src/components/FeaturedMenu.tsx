import classicBurger from "@/assets/classic-burger.png";
import creamyPasta from "@/assets/creamy-pasta.png";
import crispyFries from "@/assets/crispy-fries.png";

const menuItems = [
  {
    id: 1,
    title: "Classic Burger",
    description: "Juicy beef patty with fresh toppings",
    image: classicBurger,
  },
  {
    id: 2,
    title: "Creamy Pasta",
    description: "Rich and creamy pasta with your choice of sauce",
    image: creamyPasta,
  },
  {
    id: 3,
    title: "Crispy Fries",
    description: "Perfectly seasoned and crispy fries",
    image: crispyFries,
  },
];

const FeaturedMenu = () => {
  return (
    <section id="menu" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Menu Items</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="rounded-2xl overflow-hidden mb-4 aspect-square">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-muted"></div>
        <div className="w-2 h-2 rounded-full bg-muted"></div>
        <div className="w-2 h-2 rounded-full bg-muted"></div>
      </div>
    </section>
  );
};

export default FeaturedMenu;