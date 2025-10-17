import { Button } from "@/components/ui/button";
import heroFood from "@/assets/hero-food.png";

const Hero = () => {
  return (
    <section className="relative mt-16 mx-4 rounded-3xl overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
        <img
          src={heroFood}
          alt="Delicious food selection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4">
          <div className="inline-block bg-black/80 text-brand-yellow px-6 py-3 rounded-lg font-bold text-2xl mb-6 border-2 border-brand-yellow/30">
            Pop101
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-4xl">
            Your Ultimate Snack Stop!
          </h1>
          <Button size="lg" className="text-lg px-8 py-6">
            Order Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;