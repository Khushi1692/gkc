import { Ban, Flame, Heart, Leaf, MapPin, Star, Truck, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden px-4 py-12 sm:px-8 md:px-12 lg:px-20">

      {/* =========================================
          CHAPTER 1: THE ORIGIN (2023)
          Style: Split "Comic Book" Layout
      ========================================= */}
      <section className="mx-auto mb-32 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Left Panel: The Hook (White Card) */}
          <div className="border-border bg-card relative flex flex-col justify-between rounded-3xl border-4 p-8 shadow-[8px_8px_0px_0px_var(--border)] lg:col-span-7 lg:p-12">

            {/* Date Badge */}
            <div className="absolute -top-6 -left-4 rotate-[-6deg]">
              <div className="bg-primary border-border shadow-sm flex items-center justify-center rounded-full border-4 px-6 py-2 font-black uppercase tracking-widest text-foreground">
                Since 2023
              </div>
            </div>

            <div>
              <h1 className="text-foreground font-bungee mb-6 text-5xl uppercase leading-none md:text-6xl lg:text-7xl">
                Our <span className="text-primary underline decoration-4 underline-offset-4">Crazy</span> <br /> Beginning
              </h1>

              <p className="text-foreground/80 text-lg font-bold leading-relaxed">
                It all started in 2023... not in a boardroom, not in a business meeting — but in our home kitchen.
              </p>
              <br />
              <p className="text-foreground/80 text-lg font-medium leading-relaxed">
                One evening, my wife created a burger recipe that completely surprised me. One bite and I remember thinking:
              </p>
            </div>

            {/* The Quote Bubble (Gray/Muted) */}
            <div className="bg-muted border-border relative mt-8 rounded-2xl border-4 p-6">
              <div className="bg-muted border-border absolute -top-4 left-10 h-6 w-6 rotate-45 border-l-4 border-t-4"></div>
              <p className="font-bungee text-xl text-foreground md:text-2xl">
                “Why is this burger not out there?”
              </p>
            </div>
          </div>

          {/* Right Panel: The Vision (Yellow instead of Black) */}
          {/* CHANGED: Swapped bg-foreground for bg-primary and text-background for text-foreground */}
          <div className="bg-primary text-foreground border-border relative flex flex-col justify-center rounded-3xl border-4 p-8 shadow-[8px_8px_0px_0px_var(--chart-5)] lg:col-span-5">
            <Flame className="text-foreground absolute right-4 top-4 h-12 w-12 animate-pulse opacity-50" />

            <h2 className="font-bungee mb-6 text-3xl uppercase leading-tight">
              The Vision
            </h2>
            <p className="mb-6 text-lg font-medium leading-relaxed">
              The flavours were bold. The texture was perfect. It wasn’t trying to copy anything — it had its own identity.
            </p>
            <p className="text-xl font-bold leading-relaxed">
              That single recipe sparked a bigger question:
              <br />
              {/* Highlight changed to white for contrast on yellow */}
              <span className="bg-card px-1 decoration-wavy underline decoration-2 underline-offset-4">Why should vegetarians settle for average fast food?</span>
            </p>
            <div className="border-foreground/20 mt-8 border-t-2 border-dashed pt-4">
              <p className="font-mono text-sm uppercase tracking-widest opacity-70">
                That moment was the birth of POP101.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================
          CHAPTER 2: THE JOURNEY (Timeline)
          Style: Connected Road Map
      ========================================= */}
      <section className="relative mx-auto mb-32 max-w-5xl">

        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground font-bungee text-4xl uppercase md:text-5xl">
            The Road to <span className="bg-primary px-2 shadow-[4px_4px_0px_0px_var(--border)] border-2 border-border">POP101</span>
          </h2>
        </div>

        {/* Connecting Line (Dashed) */}
        <div className="border-foreground absolute left-1/2 top-24 hidden h-full w-0 -translate-x-1/2 border-l-4 border-dashed md:block"></div>

        <div className="space-y-16">

          {/* TRUCK 1: CLAYTON */}
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Card */}
            <div className="order-2 md:order-1 md:text-right">
              <div className="border-border bg-card group relative inline-block rotate-2 rounded-2xl border-4 p-6 text-left shadow-[6px_6px_0px_0px_var(--border)] transition-transform hover:rotate-0 hover:scale-105">
                {/* Tape Effect */}
                <div className="bg-chart-4/80 absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 -rotate-2 opacity-50"></div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary border-border flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold">01</div>
                  <h3 className="font-bungee text-2xl uppercase">Clayton (2024)</h3>
                </div>
                <p className="font-medium text-foreground/80">
                  Sleepless nights, recipe refinements, and equipment challenges. But the love from Clayton was overwhelming. <br />
                  <span className="font-bold">Customers became family.</span>
                </p>
              </div>
            </div>

            {/* Icon/Marker */}
            <div className="order-1 flex justify-center md:order-2">
              {/* CHANGED: bg-foreground -> bg-white (card) */}
              <div className="border-border bg-card z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-[4px_4px_0px_0px_var(--border)]">
                <Truck className="text-foreground h-10 w-10" />
              </div>
            </div>
          </div>

          {/* TRUCK 2: TRUGANINA */}
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Icon/Marker */}
            <div className="flex justify-center">
              <div className="border-border bg-primary z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-[4px_4px_0px_0px_var(--border)]">
                <MapPin className="text-foreground h-10 w-10" />
              </div>
            </div>

            {/* Card */}
            <div className="">
              <div className="border-border bg-card group relative inline-block -rotate-1 rounded-2xl border-4 p-6 shadow-[6px_6px_0px_0px_var(--border)] transition-transform hover:rotate-0 hover:scale-105">
                {/* Tape Effect */}
                <div className="bg-chart-5/80 absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 rotate-1 opacity-50"></div>

                <div className="mb-4 flex items-center gap-3">
                  {/* CHANGED: bg-foreground -> bg-primary */}
                  <div className="bg-primary text-foreground border-border flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold">02</div>
                  <h3 className="font-bungee text-2xl uppercase">Truganina</h3>
                </div>
                <p className="font-medium text-foreground/80">
                  This wasn’t just expansion. It was proof that people truly wanted something different — <span className="font-bold">Vegetarian, flavour-driven, and made with heart.</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================
          CHAPTER 3: WHAT MAKES US DIFFERENT
          Style: Bento Grid / Menu Board
      ========================================= */}
      <section className="mx-auto mb-32 max-w-7xl">
        <div className="border-border bg-card overflow-hidden rounded-[2.5rem] border-4 shadow-[12px_12px_0px_0px_var(--border)]">

          {/* Header Strip - CHANGED: bg-foreground -> bg-primary (Yellow) */}
          <div className="bg-primary border-b-4 border-border p-8 text-center md:p-12">
            <h2 className="text-foreground font-bungee text-3xl uppercase leading-none md:text-5xl lg:text-6xl">
              What Makes POP101 Different?
            </h2>
            <p className="text-foreground/80 mt-4 text-lg font-bold uppercase tracking-wider">
              100% Vegetarian. Always.
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            {/* Box 1: Veg */}
            <div className="border-border hover:bg-chart-4/10 group flex flex-col items-center border-b-4 p-8 text-center transition-colors md:border-r-4 lg:border-b-0">
              <div className="border-border bg-chart-4 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:rotate-12">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bungee text-2xl uppercase">Pure Vegetarian</h3>
              <p className="mt-2 font-medium">Meat-free, guilt-free. We prove that veg food can be bold.</p>
            </div>

            {/* Box 2: Jain */}
            <div className="border-border hover:bg-chart-2/10 group flex flex-col items-center border-b-4 p-8 text-center transition-colors lg:border-b-0 lg:border-r-4">
              <div className="border-border bg-chart-2 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-rotate-12">
                <Ban className="text-foreground h-8 w-8" />
              </div>
              <h3 className="font-bungee text-2xl uppercase">Jain Friendly</h3>
              <p className="mt-2 font-medium">No Onion. No Garlic. <br /> Dedicated options without compromising flavor.</p>
            </div>

            {/* Box 3: Vegan */}
            <div className="border-border hover:bg-chart-5/10 group flex flex-col items-center p-8 text-center transition-colors">
              <div className="border-border bg-chart-5 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:scale-110">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bungee text-2xl uppercase">Vegan Options</h3>
              <p className="mt-2 font-medium">Dairy-free choices available for almost every item on the menu.</p>
            </div>

          </div>

          {/* Bottom Statement - CHANGED: bg-primary -> bg-card (White) for contrast against yellow header */}
          <div className="bg-card border-t-4 border-border p-6 text-center">
            <p className="text-foreground text-lg font-black uppercase">
              "Vegetarian food should never feel like a compromise."
            </p>
          </div>
        </div>
      </section>


      {/* =========================================
          CHAPTER 4: VALUES & FOOTER
          Style: Sticker Wall
      ========================================= */}
      <section className="mx-auto max-w-4xl text-center">

        <h2 className="text-foreground font-bungee mb-10 text-4xl uppercase md:text-5xl">
          More Than Just A <br /> Food Truck
        </h2>

        {/* Value "Stickers" */}
        <div className="mb-16 flex flex-wrap justify-center gap-6">
          {[
            { text: 'Family Support', icon: Heart, color: 'bg-chart-1' },
            { text: 'Team Dedication', icon: Users, color: 'bg-chart-2' },
            { text: 'Community Love', icon: Star, color: 'bg-chart-3' },
            { text: 'Relentless Improvement', icon: Flame, color: 'bg-chart-4' }
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} border-border flex transform items-center gap-2 rounded-full border-2 px-6 py-3 font-bold uppercase shadow-[4px_4px_0px_0px_var(--border)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--border)]`}
              style={{ transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})` }}
            >
              <item.icon className="h-5 w-5" />
              {item.text}
            </div>
          ))}
        </div>

        {/* Final Impact Card */}
        {/* CHANGED: bg-foreground (black) -> bg-card (white) */}
        <div className="bg-card text-foreground border-border relative overflow-hidden rounded-3xl border-4 px-6 py-16 shadow-[8px_8px_0px_0px_var(--primary)] md:px-12">
          {/* Background pattern - dark dots instead of white light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30"></div>

          <div className="relative z-10">
            <p className="mb-8 text-xl font-medium leading-relaxed">
              From one recipe in 2023 to two thriving food trucks in Melbourne — this journey has been nothing short of crazy, humbling, and inspiring.
            </p>

            <p className="font-bungee mb-8 text-2xl uppercase text-primary drop-shadow-[2px_2px_0px_var(--border)]">
              And we’re just getting started.
            </p>

            <div className="inline-block transform transition-transform hover:scale-105">
              <div className="bg-primary text-foreground border-border flex items-center gap-3 rounded-xl border-4 px-8 py-4 shadow-[4px_4px_0px_0px_var(--foreground)]">
                <span className="font-bungee text-2xl uppercase sm:text-3xl">POP101</span>
                <div className="bg-foreground h-8 w-1"></div>
                <span className="font-bungee text-sm uppercase tracking-wide sm:text-lg">Where Veg Goes Premium</span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default AboutUs;