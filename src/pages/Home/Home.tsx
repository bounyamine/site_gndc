import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { JoinCommunity } from "@/components/home/JoinCommunity";
import { Leaders } from "@/components/home/Leaders";
import { Projects } from "@/components/home/Projects";
import { Stats } from "@/components/home/Stats";
import { Upcoming } from "@/components/home/Upcoming";
import { MainLayout } from "@/layouts/MainLayout";


const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Stats />
      <Features />
      <Projects />
      <Upcoming />
      <Leaders />
      <JoinCommunity />
    </MainLayout>
  );
};

export default Home;