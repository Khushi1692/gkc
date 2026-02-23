import CustomerReviews from "@/components/CustomerReviews";
import FeaturedMenu from "@/components/FeaturedMenu";
import Hero from "@/components/Hero";
import ViralBurgerStory from "@/components/ViralBurgerStory";
import WhyPop101 from "@/components/WhyPop101";

const Home = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8 md:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto space-y-24">
        <Hero />
        <FeaturedMenu />
        <WhyPop101 />
        <ViralBurgerStory />
        <CustomerReviews />
      </div>
    </main>
  );
};

export default Home;