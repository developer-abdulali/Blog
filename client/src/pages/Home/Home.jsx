import Article from "../../components/Article/Article";
import CTA from "../../components/CTA/CTA";
import HeroSection from "../../components/HeroSection/HeroSection";
import MainLayout from "../../components/MainLayout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <Article />
      <CTA />
    </MainLayout>
  );
};
export default Home;
