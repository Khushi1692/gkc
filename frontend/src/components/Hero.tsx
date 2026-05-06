import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Star, Clock, MapPin, Flame } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col lg:flex-row items-center justify-between gap-12 py-12 lg:py-0 overflow-visible">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

            {/* Left Content Column */}
            <div className="flex-1 z-10 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-[fade-in_0.8s_ease-out]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-primary text-[10px] font-black uppercase tracking-widest">
                        Authentic Kathiyawadi Experience
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-foreground text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-8 tracking-tighter animate-[slide-up_1s_ease-out]">
                    Taste the <span className="text-primary italic text-gradient-primary pr-4">Heart</span><br />
                    of Traditions.
                </h1>

                {/* Subtext */}
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 animate-[slide-up_1.2s_ease-out]">
                    Experience the authentic soul of Kathiyawadi cuisine. 
                    Generational recipes crafted with pure ghee, hand-ground spices, and a legacy of love.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 animate-[slide-up_1.4s_ease-out] mb-12">
                    <Button
                        onClick={() => navigate('/menu')}
                        className="h-16 px-10 text-base font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 group"
                    >
                        Order Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/about')}
                        className="h-16 px-8 text-base font-bold rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                        Our Story
                    </Button>
                </div>

                {/* Trust Row */}
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 animate-[fade-in_1.6s_ease-out]">
                    {[
                        { icon: UtensilsCrossed, label: 'Authentic', sub: 'Kathiyawadi' },
                        { icon: Star, label: '100% Veg', sub: 'Pure & Jain' },
                        { icon: Clock, label: 'Fastest', sub: 'Pre-Order' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center lg:items-start gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <item.icon className="h-4 w-4 text-primary" />
                                <span className="font-bold text-sm">{item.label}</span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{item.sub}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Image Column */}
            <div className="flex-1 relative animate-[fade-in_1.5s_ease-out]">
                <div className="relative z-10 w-full max-w-[600px] aspect-square mx-auto">
                    {/* Decorative Rings */}
                    <div className="absolute inset-0 border-[20px] border-primary/5 rounded-[4rem] -rotate-6 scale-105 -z-10"></div>
                    <div className="absolute inset-0 border border-primary/10 rounded-[4rem] rotate-3 scale-110 -z-10"></div>

                    {/* Main Image Card */}
                    <div className="relative h-full w-full overflow-hidden rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
                        <img
                            src="/assets/hero-collage.png"
                            alt="Signature Kathiyawadi Dishes"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Floating Price/Badge on Image */}
                        <div className="absolute bottom-8 left-8 glass p-4 rounded-2xl shadow-2xl animate-float">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    GK
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Signature Dish</p>
                                    <p className="text-sm font-black pr-4">Kathiyawadi Thali</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-6 -right-6 h-24 w-24 bg-white dark:bg-black rounded-3xl shadow-2xl flex items-center justify-center animate-float [animation-delay:1s] z-20 border border-border">
                        <Flame className="h-8 w-8 text-orange-500 fill-orange-500/20" />
                    </div>
                    
                    <div className="absolute -bottom-4 -right-12 hidden lg:flex items-center gap-4 glass-card p-6 rounded-3xl animate-float [animation-delay:2s] z-20">
                         <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-6 w-6 text-primary" />
                         </div>
                         <div>
                            <p className="text-xs font-bold">Find us in</p>
                            <p className="text-sm font-black">Clayton, Hawton, Adelaide</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;