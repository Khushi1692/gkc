import { ExternalLink } from "lucide-react";

const IndianBurgerStory = () => {
    return (
        <section className="mx-auto mb-32 px-4">

            {/* Section Title */}
            <div className="mb-16 text-center">
                <h2 className="font-black text-3xl uppercase leading-tight sm:text-4xl md:text-6xl tracking-tighter">
                    Gopi ka Chatka's <span className="text-primary italic">Accidental</span> <br className="hidden sm:block" />
                    Viral Burger
                </h2>
                <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-primary/20"></div>
                <p className="mt-6 text-muted-foreground font-medium max-w-2xl mx-auto text-lg">
                    The story of how a home Indian kitchen sparked Melbourne's most unexpected food sensation
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-card relative rounded-[3rem] shadow-2xl overflow-hidden border border-border/50 transition-all hover:shadow-primary/5">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Image */}
                    <div className="relative h-80 sm:h-96 md:h-full group overflow-hidden">
                        <img
                            src="https://pop101.com.au/uploads/ufo-blog.webp"
                            alt="Melbourne Viral Indian Burger"
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {/* Badge */}
                        <div className="absolute top-6 left-6 bg-primary text-primary-foreground rounded-2xl px-4 py-2 shadow-lg">
                            <p className="font-black text-xs uppercase tracking-widest">As seen on</p>
                            <p className="font-black text-base">Seasoned Traveller</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16">
                        <h3 className="font-bold mb-8 text-3xl uppercase leading-tight sm:text-4xl tracking-tight text-foreground">
                            Melbourne's First UFO Burger is Vegetarian with an <span className="text-primary">Indian Twist</span>
                        </h3>

                        <div className="space-y-6">
                            <p className="text-lg font-bold text-foreground/90 leading-relaxed italic border-l-4 border-primary pl-6">
                                "An Indian family function was the accidental birthplace of Melbourne's first viral UFO burger —
                                and it is 100% Indian vegetarian."
                            </p>
                            <p className="text-base font-medium text-muted-foreground leading-relaxed">
                                Gopi ka Chatka owner Jaynam "Jay" Shah was trying to prevent fillings from sliding out of the bun when he
                                accidentally created Melbourne's first sealed "UFO burger" — a patty and Indian spiced toppings welded into
                                a crusty, rimmed bun shaped like a flying saucer. In a world of UFO burgers, Jay's is unique: completely vegetarian
                                with an authentic Indian twist rooted in Gujarati cuisine.
                            </p>
                        </div>

                        <a
                            href="https://seasonedtraveller.com/places/Melbourne-Viral-UFO-Burger"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-10 inline-flex w-fit items-center gap-3 font-black uppercase tracking-[0.2em] text-primary transition-all hover:translate-x-2 text-sm"
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

export default IndianBurgerStory;