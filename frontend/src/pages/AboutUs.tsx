import { Button } from '@/components/ui/button';
import { Award, ChefHat, Clock, Heart, Leaf, Target, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const values = [
  {
    icon: Heart,
    title: 'Quality Ingredients',
    description:
      'We source only the freshest, highest-quality ingredients for every dish we serve.',
  },
  {
    icon: ChefHat,
    title: 'Expert Craftsmanship',
    description:
      'Our skilled chefs bring years of experience and passion to every burger they create.',
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Quick preparation without ever compromising on quality or taste.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for our exceptional food quality and outstanding customer experience.',
  },
];

const features = [
  {
    icon: Leaf,
    title: 'Fresh Daily',
    description: 'All ingredients are sourced fresh daily from trusted local suppliers.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction drives everything we do, from menu creation to service.',
  },
  {
    icon: Target,
    title: 'Consistency',
    description: 'Every meal is prepared to the same high standard, every single time.',
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-background min-h-screen px-4 py-6 sm:px-8 md:px-12 md:py-10 lg:px-20 xl:px-32 2xl:px-40">
        <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="relative aspect-[16/12] w-full sm:aspect-[16/8]">
            <img
              src="/hero-about.png"
              alt="Delicious food"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center">
              <div className="flex -translate-y-1 flex-col items-center sm:translate-y-4 md:translate-y-4 lg:translate-y-4 xl:translate-y-10">
                <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Comfort Food, Made with Love and Speed
                </h1>
                <p className="mb-6 w-[90%] text-sm text-white sm:mb-8 sm:text-lg">
                  We're dedicated to bringing you delicious, comforting meals, prepared quickly and
                  with the freshest ingredients. Our team works tirelessly to ensure every bite is a
                  delightful experience.
                </p>

                <Button
                  className="rounded-md px-6 py-3 font-semibold sm:px-6 sm:py-4 md:px-8 md:py-5 md:text-lg lg:py-6 lg:text-xl"
                  onClick={() => navigate('/menu')}
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground px-4 text-base leading-relaxed md:text-lg lg:text-xl">
              Indulge in a Symphony of flavors with our tantalizing menu featuring sizzling burgers,
              golden fries, sumptuous pasta and ice-cold sodas! From classic favorites to
              mouthwatering twists, each bite is a journey of pure satisfaction. Whether you're
              craving comfort food or a gourmet treat, we've got your taste buds covered. Dive into
              deliciousness and elevate your experience with our irresistible offerings.
            </p>
          </div>
        </section>

        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl">
              What Makes Us Special
            </h2>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card flex flex-col items-center rounded-xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full md:h-16 md:w-16">
                    <value.icon className="text-primary h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold md:text-xl">{value.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl">
                Our Promise to You
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-primary/5 border-primary/10 flex flex-col items-start rounded-xl border p-6"
                  >
                    <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                      <feature.icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
