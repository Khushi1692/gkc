import { Leaf, Smile, Users } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Quality First',
      description: 'Fresh, local, and high-quality ingredients are the foundation of our menu.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We believe in building a strong community, one burger at a time.',
    },
    {
      icon: Smile,
      title: 'Pure Happiness',
      description: 'Our goal is simple: to bring a smile to your face with every bite.',
    },
  ];
  return (
    <>
      <div className="bg-background min-h-screen px-4 py-6 sm:px-8 md:px-12 md:py-10 lg:px-20 xl:px-32 2xl:px-40">
        <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="relative aspect-[16/12] w-full sm:aspect-[16/8]">
            <img
              src="/about-hero.jpg"
              alt="Delicious food"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center">
              <div className="flex -translate-y-1 flex-col items-center sm:translate-y-4 md:translate-y-4 lg:translate-y-4 xl:translate-y-10">
                <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Our Story
                </h1>
                <p className="mb-6 w-[90%] text-sm text-white sm:mb-8 sm:text-lg">
                 Indulge in a Symphony of flavors with our tantalizing menu featuring sizzling burgers, golden fries, sumptuous, pasta and ice - cold sodas ! From classic favorites to mouthwatering twists, each bite is a journey of pure satisfaction. Whether  you're craving comfort food or a gourmet treat. We've got your taste buds covered . Dive into deliciousness and elevate your irresistible offerings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="order-2 lg:order-1">
                  <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                    From a Dream to Your Favorite Burger
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    Our journey began in 2015 with a simple idea: create the perfect burger. It
                    started with a family recipe and a lot of passion, serving from a small food
                    truck. The overwhelming support from our community led us to open our first
                    restaurant in 2017. Today, we continue to serve the same delicious burgers that
                    brought us together, always focusing on quality and a welcoming atmosphere.
                  </p>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="overflow-hidden rounded-lg relative aspect-video">
                    <img
                      src={'/about-interior.jpg'}
                      alt="Pop101 restaurant interior"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="order-1">
                  <div className="overflow-hidden rounded-lg aspect-video">
                    <img
                      src={'/about-mission.jpg'}
                      alt="Gourmet burger from Pop101"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
                <div className="order-2">
                  <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">Our Mission</h2>
                  <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    To serve incredible burgers that make people happy. We are committed to using
                    the freshest, locally-sourced ingredients to craft food that not only tastes
                    great but also supports our community. Every meal is a promise of quality and a
                    moment of pure bliss.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center md:mb-16">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Our Values</h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  The principles that guide every decision we make.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-card border-border flex flex-col items-center rounded-2xl border p-8 text-center transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full md:h-20 md:w-20">
                      <value.icon
                        className="text-primary h-8 w-8 md:h-10 md:w-10"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="mb-3 text-xl font-bold md:text-2xl">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                      {value.description}
                    </p>
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
