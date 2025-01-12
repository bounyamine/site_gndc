import { Hero } from "../../components/home/Hero";
import { Features } from "../../components/home/Features";
import { JoinCommunity } from "../../components/home/JoinCommunity";
import { Projects } from "../../components/Projects";
import { Stats } from "../../components/home/Stats";
import { Upcoming } from "../../components/home/Upcoming";
import { MainLayout } from "../../layouts/MainLayout";
import { Leaders } from "@/components/home/Leaders";


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