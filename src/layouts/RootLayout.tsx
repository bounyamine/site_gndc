import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/home/Navbar';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;