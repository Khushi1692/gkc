import CustomerReviews from "@/components/CustomerReviews";
import FeaturedMenu from "@/components/FeaturedMenu";
import Hero from "@/components/Hero";
import WhyPop101 from "@/components/WhyPop101";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-background px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-6 md:py-10">
        <Hero />
        <FeaturedMenu />
        <WhyPop101 />
        <CustomerReviews />
      </div>
    </>
  );
};

export default Home;
