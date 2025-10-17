import { Leaf, Clock, Smile } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We use only the freshest ingredients in all our dishes.",
  },
  {
    icon: Clock,
    title: "Quick Serving",
    description: "Get your food delivered quickly and efficiently.",
  },
  {
    icon: Smile,
    title: "Delicious Taste",
    description: "Our food is crafted to deliver a taste sensation.",
  },
];

const WhyPop101 = () => {
  return (
    <section className="bg-secondary/30 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why POP101?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-card p-8 rounded-2xl border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPop101;