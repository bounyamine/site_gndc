import React from 'react';
import { UserCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Événements', path: '/events' },
    { label: 'Projets', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo & Desktop Nav */}
            <div className="flex">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800">GNDC</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8 ml-10">
                {navItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* User Menu & Mobile Toggle */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="p-2 rounded-full text-gray-600 hover:text-gray-900">
                  <UserCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="md:hidden ml-4">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} GNDC. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;