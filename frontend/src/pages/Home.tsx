import Hero from "@/components/Hero";
import FeaturedMenu from "@/components/FeaturedMenu";
import WhyPop101 from "@/components/WhyPop101";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background px-[160px] py-[20px]">
      <Navbar />
      <Hero />
      <FeaturedMenu />
      <WhyPop101 />
      <CustomerReviews />
      <Footer />
    </div>
  );
};

export default Home;