import { Leaf, Clock, Smile } from 'lucide-react';

const features = [
    { icon: Leaf, title: 'Fresh Ingredients', description: 'We use only the freshest ingredients in all our dishes.', color: 'bg-chart-4' },
    { icon: Clock, title: 'Quick Serving', description: 'Get your food delivered quickly and efficiently.', color: 'bg-chart-5' },
    { icon: Smile, title: 'Delicious Taste', description: 'Our food is crafted to deliver a taste sensation.', color: 'bg-chart-2' },
];

const WhyPop101 = () => {
    return (
        <section className="w-full">
            <h2 className="font-bungee mb-12 text-center text-4xl uppercase md:text-6xl">
                Why <span className="text-primary">POP101</span>?
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div key={index} className="group relative flex flex-col items-center border-4 border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--border)]">
                            <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-border ${feature.color} shadow-sm`}>
                                <Icon className="h-10 w-10 text-foreground" strokeWidth={2.5} />
                            </div>
                            <h3 className="font-bungee mb-3 text-2xl uppercase">{feature.title}</h3>
                            <p className="font-bold text-foreground/70">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyPop101;