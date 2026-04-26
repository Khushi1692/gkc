import CustomerReviews from "@/components/CustomerReviews";
import FeaturedMenu from "@/components/FeaturedMenu";
import Hero from "@/components/Hero";
import TraditionSection from "@/components/TraditionSection";
import ExperienceBanner from "@/components/ExperienceBanner";
import WhyGopiKaChatka from "@/components/WhyPop101";

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-24">
        <Hero />
        <div className="mt-24 space-y-28">
          <FeaturedMenu />
          <TraditionSection />
          <WhyGopiKaChatka />
          <ExperienceBanner />
          <CustomerReviews />
        </div>
      </div>
    </main>
  );
};

export default Home;