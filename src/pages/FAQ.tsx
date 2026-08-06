import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Is Gopi ka Chatka completely vegetarian?",
        answer:
            "Yes! Every single item on our menu is 100% pure vegetarian. We do not serve any meat products.",
    },
    {
        question: "Do you offer vegan options?",
        answer:
            "Absolutely. Many of our burgers and sides are available in vegan options. Just let our team know your preference when ordering.",
    },
    {
        question: "Do you have Jain-friendly (No Onion, No Garlic) options?",
        answer:
            "Yes! We proudly offer No Onion, No Garlic options across multiple menu items. Vegetarian food should be inclusive for everyone.",
    },
    {
        question: "Where are your branches located?",
        answer:
            "We currently operate Gopi ka Chatka in Clayton, Melbourne.",
    },
    {
        question: "Are your fries and sides vegetarian too?",
        answer:
            "Yes! Everything at Gopi ka Chatka — including fries, sauces, and sides — is completely vegetarian.",
    },
    {
        question: "Do you cater for events?",
        answer:
            "Yes, we do! For private events, community gatherings, or corporate bookings, feel free to contact us directly.",
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="bg-background min-h-screen px-4 py-20 sm:px-8 md:px-12 lg:px-20 xl:px-32">

            {/* ================= HERO ================= */}
            <section className="mx-auto mb-24 max-w-4xl text-center">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 mb-8">
                    Got Questions?
                </div>

                <h1 className="text-foreground font-black mb-8 text-5xl uppercase sm:text-6xl tracking-tighter leading-tight">
                    Frequently Asked <br />
                    <span className="text-primary italic">Questions</span>
                </h1>

                <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
                    Everything you need to know about Gopi ka Chatka and our premium vegetarian experience.
                </p>
            </section>

            {/* ================= FAQ LIST ================= */}
            <section className="mx-auto max-w-3xl space-y-4">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className={`group border border-border/50 bg-card overflow-hidden rounded-2xl transition-all duration-300 ${isActive ? "shadow-xl ring-1 ring-primary/20" : "shadow-sm hover:shadow-md"
                                }`}
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-center justify-between px-8 py-6 text-left"
                            >
                                <span className={`text-xl font-bold uppercase tracking-tight transition-colors ${isActive ? "text-primary" : "text-foreground"}`}>
                                    {faq.question}
                                </span>

                                <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isActive ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"}`}>
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </button>

                            {/* Answer */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isActive
                                    ? "grid-rows-[1fr] opacity-100 px-8 pb-8"
                                    : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="mx-auto mt-32 max-w-4xl text-center">
                <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 shadow-2xl relative overflow-hidden selection:bg-white selection:text-primary">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
                    <div className="relative z-10">
                        <h2 className="font-black mb-6 text-3xl uppercase tracking-tighter sm:text-4xl">
                            Still Curious?
                        </h2>

                        <p className="text-primary-foreground/90 font-bold mb-10 text-lg max-w-xl mx-auto">
                            Drop by one of our branches or reach out to us directly.
                            We’re always happy to help our community.
                        </p>

                        <div className="inline-flex flex-col items-center">
                            <span className="font-black text-3xl uppercase tracking-tighter">Gopi ka Chatka</span>
                            <div className="h-1 w-12 bg-primary-foreground/30 my-4 rounded-full"></div>
                            <span className="text-sm font-bold uppercase tracking-[0.3em] opacity-80">Where Veg Goes Premium</span>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FAQ;