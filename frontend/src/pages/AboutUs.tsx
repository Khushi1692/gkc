import { Leaf, Smile, Users, Heart } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Quality First',
      description: 'Fresh, local, and high-quality ingredients are the foundation of our menu.',
      // Using chart variables for background accents
      color: 'bg-chart-4', // Greenish variable
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building a strong community, one burger at a time.',
      color: 'bg-chart-5', // Blueish variable
    },
    {
      icon: Smile,
      title: 'Pure Happiness',
      description: 'Our goal is simple: to bring a smile to your face with every bite.',
      color: 'bg-chart-2', // Yellow/Primary variable
    },
  ];

  return (
    // Replaced bg-[#F6C1D1] with bg-background
    <div className="bg-background min-h-screen px-4 py-8 sm:px-8 md:px-12 lg:px-20 xl:px-32">

      {/* 1. HERO SECTION (Split Layout) */}
      {/* Replaced bg-white with bg-card, border-black with border-border */}
      <section className="bg-card border-border mx-auto mb-20 w-full overflow-hidden rounded-3xl border-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Left: Text */}
          <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
            {/* Replaced bg-[#FBCD06] with bg-primary */}
            <div className="border-border bg-primary mb-4 inline-block self-start rounded-full border-2 px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_var(--border)]">
              Since 2015
            </div>
            {/* Replaced text-black with text-foreground */}
            <h1 className="text-foreground font-bungee mb-6 text-5xl uppercase leading-none sm:text-6xl lg:text-7xl">
              OUR <span className="text-primary drop-shadow-[2px_2px_0px_var(--border)] text-shadow-black" style={{ textShadow: '3px 3px 0 var(--border)' }}>CRAZY</span> <br /> STORY
            </h1>
            <p className="text-foreground/80 text-lg font-bold leading-relaxed md:text-xl">
              Indulge in a Symphony of flavors with our tantalizing menu featuring sizzling burgers, golden fries, sumptuous pasta, and ice-cold sodas! From classic favorites to mouthwatering twists, each bite is a journey of pure satisfaction.
            </p>
          </div>

          {/* Right: Image */}
          {/* Replaced bg-black with bg-foreground */}
          <div className="border-border bg-foreground relative min-h-[300px] border-t-4 md:min-h-full md:border-l-4 md:border-t-0">
            <img
              src="/about-hero.jpg"
              alt="Delicious food"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--card)_2px,transparent_2px)] bg-[length:20px_20px] opacity-20"></div>
          </div>
        </div>
      </section>

      {/* 2. "FROM A DREAM" SECTION (Polaroid Style) */}
      <section className="mx-auto mb-24 w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-foreground font-bungee mb-6 text-4xl uppercase md:text-5xl lg:text-6xl leading-tight">
              From a <span className="decoration-primary underline decoration-4 underline-offset-4">Dream</span> to <br /> Your Plate
            </h2>
            <div className="border-border bg-card rounded-2xl border-2 p-6 shadow-[6px_6px_0px_0px_var(--border)]">
              <p className="text-foreground text-lg font-medium leading-relaxed">
                Our journey began in 2015 with a simple idea: create the perfect burger. It started with a family recipe and a lot of passion, serving from a small food truck.
                <br /><br />
                The overwhelming support from our community led us to open our first restaurant in 2017. Today, we continue to serve the same delicious burgers that brought us together.
              </p>
            </div>
          </div>

          {/* Image (Polaroid Look) */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative rotate-3 transform transition-transform duration-300 hover:rotate-0 hover:scale-105">
              {/* Tape Decoration */}
              <div className="bg-primary/90 absolute -top-6 left-1/2 z-10 h-12 w-32 -translate-x-1/2 rotate-2 opacity-80 shadow-sm"></div>

              <div className="border-border bg-card p-4 pb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] border-4">
                <div className="border-border bg-muted aspect-square overflow-hidden border-2">
                  <img
                    src="/about-interior.jpg"
                    alt="Pop101 Interior"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-mono text-muted-foreground mt-4 text-center text-xl font-bold">
                  First Location, 2017
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MISSION SECTION (Reversed Layout) */}
      <section className="mx-auto mb-24 w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Image (Polaroid Look - Tilted Left) */}
          <div className="flex justify-center">
            <div className="relative -rotate-2 transform transition-transform duration-300 hover:rotate-0 hover:scale-105">
              {/* Tape Decoration - Using muted or another chart color for variety */}
              <div className="bg-muted-foreground/40 absolute -top-6 left-1/2 z-10 h-12 w-32 -translate-x-1/2 -rotate-2 opacity-90 shadow-sm"></div>

              <div className="border-border bg-card p-4 pb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)] border-4">
                <div className="border-border bg-muted aspect-square overflow-hidden border-2">
                  <img
                    src="/about-mission.jpg"
                    alt="Our Mission"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-mono text-muted-foreground mt-4 text-center text-xl font-bold">
                  Made with Love ❤️
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <div className="border-border bg-foreground mb-4 inline-flex items-center gap-2 rounded-lg border-2 px-3 py-1 text-white">
              <Heart className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold uppercase">Our Promise</span>
            </div>
            <h2 className="text-foreground font-bungee mb-6 text-4xl uppercase md:text-5xl lg:text-6xl">
              Our Mission
            </h2>
            <div className="border-border bg-primary rounded-2xl border-2 p-6 shadow-[6px_6px_0px_0px_var(--border)]">
              <p className="text-foreground text-lg font-bold leading-relaxed">
                To serve incredible burgers that make people happy. We are committed to using the freshest, locally-sourced ingredients to craft food that not only tastes great but also supports our community.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. VALUES SECTION (Bento Grid) */}
      <section className="mx-auto mb-20 w-full max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground font-bungee mb-4 text-4xl drop-shadow-[2px_2px_0px_var(--card)] sm:text-5xl md:text-6xl">
            OUR CORE VALUES
          </h2>
          <p className="text-foreground/70 mx-auto max-w-2xl text-lg font-bold">
            The principles that guide every burger we flip and every order we take.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border-4 border-border bg-card p-8 text-center shadow-[6px_6px_0px_0px_var(--border)] transition-all hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_var(--border)]`}
            >
              {/* Background Blob on Hover - Using chart colors defined in object */}
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${value.color} transition-transform duration-500 group-hover:scale-[10]`}></div>

              <div className="border-border bg-card relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-[4px_4px_0px_0px_var(--border)]">
                <value.icon
                  className="text-foreground h-10 w-10"
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="font-bungee relative z-10 mb-3 text-2xl uppercase">{value.title}</h3>
              <p className="text-foreground/80 relative z-10 font-medium">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;