import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full overflow-hidden rounded-[2.5rem] min-h-[90vh] flex items-center shadow-2xl">
            {/* Animated Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1400&auto=format&fit=crop&q=85"
                    alt="Authentic Kathiyawadi food"
                    className="absolute inset-0 h-full w-full object-cover scale-105 animate-[ken-burns_20s_ease-out_infinite_alternate]"
                />
            </div>

            {/* Premium Overlay System */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

            {/* Content Container */}
            <div className="relative z-10 px-6 py-20 md:px-20 lg:px-32 max-w-4xl">
                {/* Eyebrow - Animated Reveal */}
                <div className="overflow-hidden mb-6">
                    <p className="text-primary text-xs font-bold uppercase tracking-[0.4em] animate-[slide-up_1s_ease-out_forwards]">
                        Kathiyawadi Cuisine • Melbourne
                    </p>
                </div>

                {/* Main Headline - Premium Stack */}
                <h1 className="text-white text-5xl font-extrabold leading-[1.05] mb-8 sm:text-7xl lg:text-8xl tracking-tight animate-[slide-up_1.2s_ease-out_forwards]">
                    Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Heart</span><br />
                    of Traditions
                </h1>

                {/* Subtext - Refined Typography */}
                <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-xl font-medium animate-[slide-up_1.4s_ease-out_forwards]">
                    Authentic vegetarian recipes, passed down through generations. 
                    Experience the bold, rustic flavors of Gujarat made with pure ghee and love.
                </p>

                {/* CTAs - Interactive & Premium */}
                <div className="flex flex-wrap gap-6 animate-[slide-up_1.6s_ease-out_forwards]">
                    <Button
                        onClick={() => navigate('/menu')}
                        className="h-14 px-10 text-base font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 group"
                    >
                        Explore Our Menu
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/about')}
                        className="h-14 px-10 text-base font-bold rounded-2xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 backdrop-blur-md transition-all group"
                    >
                        Our Story
                    </Button>
                </div>

                {/* Trust Section - Refined Icons */}
                <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap items-center gap-x-12 gap-y-6 animate-[fade-in_2s_ease-out_forwards]">
                    {[
                        { label: '100% Vegetarian', icon: '🌿' },
                        { label: 'Jain Friendly', icon: '❤️' },
                        { label: 'Homestyle Recipes', icon: '🔥' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 group">
                            <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                            <span className="text-white/60 text-sm font-bold uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating scroll indicator */}
            <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-4">
                <span className="[writing-mode:vertical-lr] text-white/40 text-[10px] uppercase font-bold tracking-[0.5em]">Scroll to explore</span>
                <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;