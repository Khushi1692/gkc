import CustomerReviews from "@/components/CustomerReviews";
import FeaturedMenu from "@/components/FeaturedMenu";
import Hero from "@/components/Hero";
import TraditionSection from "@/components/TraditionSection";
import ExperienceBanner from "@/components/ExperienceBanner";


const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-8">
        <Hero />
        <div className="mt-8 space-y-12">
          <FeaturedMenu />
          <TraditionSection />

          <ExperienceBanner />
          <CustomerReviews />
        </div>
      </div>
    </main>
  );
};

export default Home;