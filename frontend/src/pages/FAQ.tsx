import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Is POP101 completely vegetarian?",
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
        question: "Where are your food trucks located?",
        answer:
            "We currently operate two POP101 food trucks in Melbourne — one in Clayton and one in Truganina.",
    },
    {
        question: "Are your fries and sides vegetarian too?",
        answer:
            "Yes! Everything at POP101 — including fries, sauces, and sides — is completely vegetarian.",
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
        <div className="bg-background min-h-screen px-4 py-12 sm:px-8 md:px-12 lg:px-20 xl:px-32">

            {/* ================= HERO ================= */}
            <section className="mx-auto mb-20 max-w-4xl text-center">
                <div className="border-border bg-primary mb-6 inline-block rounded-full border-2 px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_var(--border)]">
                    Got Questions?
                </div>

                <h1 className="text-foreground font-bungee mb-6 text-5xl uppercase sm:text-6xl">
                    Frequently Asked <br />
                    <span className="text-primary drop-shadow-[3px_3px_0_var(--border)]">
                        Questions
                    </span>
                </h1>

                <p className="text-foreground/70 text-lg font-bold">
                    Everything you need to know about POP101.
                </p>
            </section>

            {/* ================= FAQ LIST ================= */}
            <section className="mx-auto max-w-4xl space-y-6">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <div
                            key={index}
                            className="border-border bg-card overflow-hidden rounded-2xl border-4 shadow-[6px_6px_0px_0px_var(--border)] transition-all"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="font-bungee text-xl uppercase">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    className={`h-6 w-6 transition-transform duration-300 ${isActive ? "rotate-180 text-primary" : ""
                                        }`}
                                />
                            </button>

                            {/* Answer */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isActive
                                    ? "grid-rows-[1fr] opacity-100 px-6 pb-6"
                                    : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-foreground/80 font-medium leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="mx-auto mt-24 max-w-4xl text-center">
                <div className="border-border bg-primary rounded-3xl border-4 p-10 shadow-[8px_8px_0px_0px_var(--border)]">
                    <h2 className="font-bungee mb-4 text-3xl uppercase">
                        Still Curious?
                    </h2>

                    <p className="text-foreground font-bold mb-6">
                        Drop by one of our trucks or reach out to us directly.
                        We’re always happy to help.
                    </p>

                    <div className="font-bungee text-2xl uppercase">
                        POP101
                        <div className="text-sm font-bold mt-2">
                            Where Veg Goes Premium.
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FAQ;