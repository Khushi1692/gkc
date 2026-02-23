import { ExternalLink } from "lucide-react";

const ViralBurgerStory = () => {
    return (
        <section className="mx-auto mb-24 px-4">

            {/* Section Title */}
            <div className="mb-14 text-center">
                <h2 className="font-bungee text-3xl uppercase leading-tight sm:text-4xl md:text-6xl">
                    Pop101’s <span className="text-primary">Accidental</span> <br className="hidden sm:block" />
                    Viral Burger
                </h2>
            </div>

            {/* Main Card */}
            <div className="border-border bg-card relative rounded-3xl border-4 shadow-[8px_8px_0px_0px_var(--border)] overflow-hidden">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Image */}
                    <div className="relative h-64 sm:h-72 md:h-full">
                        <img
                            src="https://pop101.com.au/uploads/ufo-blog.webp"
                            alt="Melbourne Viral UFO Burger"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-evenly p-6 sm:p-8 md:p-10">
                        <h3 className="font-bungee mb-4 text-3xl uppercase leading-snug sm:text-4xl">
                            Melbourne's First UFO Burger is Vegetarian with an Indian Twist
                        </h3>

                        <p className="mb-6 text-base font-bold text-foreground/80 sm:text-xl">
                            An Indian family function was the accidental birthplace of Melbourne's first viral UFO burger.
                            Now Pop101 food truck serves one unlike anywhere else in the world.
                        </p>
                        <p className="mb-6 text-base font-medium text-foreground/80 sm:text-xl">Melbourne’s first UFO burgers didn’t arrive with a social-media strategy – they crash-landed by accident. Pop101 owner Jaynam “Jay” Shah was trying to prevent burger fillings from sliding out the back of the bun, when he unintentionally became the city’s first pilot of the viral “sealed” burger: a patty and toppings welded into a crusty, rimmed bun shaped like a flying saucer. In a social-media galaxy of UFO burgers, Jay’s is unique: it’s completely vegetarian with an Indian twist. </p>

                        <a
                            href="https://seasonedtraveller.com/places/Melbourne-Viral-UFO-Burger"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex w-fit items-center gap-2 font-black uppercase tracking-wide text-primary transition-all hover:translate-x-1 text-xl"
                        >
                            Read Full Story
                            <ExternalLink className="h-4 w-4 transition-transform group-hover:rotate-12" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViralBurgerStory;