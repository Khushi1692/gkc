import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="mx-auto mb-12 w-full overflow-hidden rounded-3xl border-4 border-border bg-card shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Text Content */}
                <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
                    {/* Badge */}
                    <div className="mb-6 inline-block self-start rounded-full border-2 border-border bg-primary px-4 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_var(--border)]">
                        Open for Pickup!
                    </div>

                    {/* Logo - Kept from original content */}
                    <img
                        src="/pop101-logo.png"
                        alt="Pop101 Logo"
                        className="mb-6 w-32 drop-shadow-[3px_3px_0px_var(--border)] sm:w-40 md:w-48"
                    />

                    {/* Original Heading */}
                    <h1 className="font-bungee mb-6 text-5xl uppercase leading-none text-foreground sm:text-6xl lg:text-7xl">
                        Your Ultimate <br />
                        <span
                            className="text-primary"
                            style={{ textShadow: '4px 4px 0px var(--border)' }}
                        >
                            Snack Stop!
                        </span>
                    </h1>

                    {/* Original Button */}
                    <Button
                        size="lg"
                        className="mt-4 h-14 w-full sm:w-fit px-10 text-xl font-black uppercase shadow-[4px_4px_0px_0px_var(--border)] transition-all hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_var(--border)]"
                        onClick={() => navigate('/menu')}
                    >
                        Order Now
                    </Button>
                </div>

                {/* Right: Image Content */}
                <div className="relative min-h-[350px] border-t-4 border-border bg-foreground md:border-l-4 md:border-t-0 md:min-h-full">
                    <img
                        src="/hero-image.png"
                        alt="Delicious food"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
                    />
                    {/* Pattern Overlay using your card color for the dots */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(var(--card) 2px, transparent 2px)',
                            backgroundSize: '20px 20px'
                        }}
                    ></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;