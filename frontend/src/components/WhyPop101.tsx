import { Leaf, Clock, Smile } from 'lucide-react';

const features = [
    {
        icon: Leaf,
        title: 'Fresh Ingredients',
        description: 'We use only the freshest ingredients in all our dishes.',
    },
    {
        icon: Clock,
        title: 'Quick Serving',
        description: 'Get your food delivered quickly and efficiently.',
    },
    {
        icon: Smile,
        title: 'Delicious Taste',
        description: 'Our food is crafted to deliver a taste sensation.',
    },
];

const WhyPop101 = () => {
    return (
        <section className="relative mx-auto mt-10 w-full max-w-6xl overflow-hidden rounded-xl">
            <h2 className="mb-12 text-3xl font-bold md:text-4xl">Why POP101?</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="bg-card rounded-2xl border p-4">
                            <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                <Icon className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyPop101;
