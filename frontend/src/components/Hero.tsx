import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate()
    return (
        <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl bg-pink-300">
            <div className="relative aspect-[16/12] w-full sm:aspect-[16/8]">
                <img
                    src="/hero-image.png"
                    alt="Delicious food"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center">
                    <div className="flex -translate-y-1 flex-col items-center sm:-translate-y-4 md:-translate-y-4 lg:-translate-y-4 xl:-translate-y-10">
                        <img
                            src="/pop101-logo.png"
                            alt="Pop101 Logo"
                            className="w-30 sm:w-30 md:w-36 lg:w-44 xl:w-60"
                        />

                        <h1 className="mb-6 text-3xl font-bold text-white sm:mb-8 sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl">
                            Your Ultimate Snack Stop!
                        </h1>

                        <Button className="rounded-md px-6 py-3 font-semibold sm:px-6 sm:py-4 md:px-8 md:py-5 md:text-lg lg:py-6 lg:text-xl" onClick={()=>navigate('/menu')}>
                            Order Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
