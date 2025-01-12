import { Footer } from "../components/home/Footer";
import { Navbar } from "../components/home/Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen">
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  );