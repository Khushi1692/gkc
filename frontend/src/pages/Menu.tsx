import classicburger from "@/assets/classic-burger.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menuItems = [
  {
    id: 1,
    title: "Classic Cheeseburger",
    description:
      "Juicy beef patty, melted cheddar, crisp lettuce, ripe tomato, and tangy pickles on a toasted sesame seed bun.",
    image: classicburger,
    category: "burger",
  },
  {
    id: 2,
    title: "Spicy Jalapeno Burger",
    description:
      "Fiery jalapenos, pepper jack cheese, chipotle mayo, and a juicy beef patty on a toasted bun.",
    image: classicburger,
    category: "burger",
  },
  {
    id: 3,
    title: "Mushroom Swiss Burger",
    description:
      "Savory sauteed mushrooms, melted Swiss cheese, and a juicy beef patty on a toasted bun.",
    image: classicburger,
    category: "burger",
  },
  {
    id: 4,
    title: "BBQ Bacon Burger",
    description:
      "Crispy bacon, tangy BBQ sauce, cheddar cheese, and a juicy beef patty on a toasted bun.",
    image: classicburger,
    category: "burger",
  },
  {
    id: 5,
    title: "Veggie Burger",
    description:
      "Plant-based patty, lettuce, tomato, onion, and pickles on a toasted bun.",
    image: classicburger,
    category: "burger",
  },
];

const categories = [
  "Burger",
  "Pasta",
  "Fries",
  "Soda",
  "Nachos",
  "Corn Cups",
  "Dips",
  "Quesadilla",
  "Combo",
];

const Menu = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative h-[400px] mt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/hero-image.png)` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Your Favorite Food, Delivered Fast
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
            Craving something delicious? Pop 101 brings your favorite meals
            right to you door. Order now and enjoy a feast without leaving your
            couch.
          </p>
          <Button
            size="lg"
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            Order Now
          </Button>
        </div>
      </section>

      {/* Menu Section */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="Burger" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent border-b rounded-none pb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Burger" className="mt-8">
            <div className="space-y-6">
              {menuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_300px] gap-0">
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {item.description}
                        </p>
                        <Button variant="secondary" className="w-fit">
                          Add to Cart
                        </Button>
                      </div>
                      <div className="h-[250px] md:h-auto">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {category} menu items coming soon...
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

    </div>
  );
};

export default Menu;
