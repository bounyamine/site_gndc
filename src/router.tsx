import { createBrowserRouter } from 'react-router-dom';
import BlogPage from './pages/Blog/BlogPage';
import HomePage from './pages/Home/Home';
import ContactPage from './pages/Contact/ContactPage';
import EventsPage from './pages/Events/EventsPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import Dashboard from './pages/Dashboard/Dashboard';
import { Login, Register } from './components/features/auth';
import AdminPage from './pages/Admin/AdminPage';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <HomePage />,
        index: true,
      },
      {
        path: 'blogs',
        element: <BlogPage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
]);