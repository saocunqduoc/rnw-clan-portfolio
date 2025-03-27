
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Members from "@/components/Members";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Recruitment from "@/components/Recruitment";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Members />
      <Achievements />
      <Gallery />
      <Recruitment />
      <Footer />
    </div>
  );
};

export default Index;
