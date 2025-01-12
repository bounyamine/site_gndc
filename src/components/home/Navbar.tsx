import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import logo from '../../assets/logo.webp';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo et menu principal */}
        <div className="flex items-center space-x-4">
          <div className="bg-white font-bold text-xl">
            <Link to="/" className="text-white" aria-label="Accueil">
              <img src={logo} alt="Logo GNDC" className="h-10" />
            </Link>
          </div>

          {/* Menu principal pour grands écrans */}
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="hover:text-blue-200 transition duration-200" aria-label="Accueil">Accueil</Link></li>
            <li><Link to="/events" className="hover:text-blue-200 transition duration-200" aria-label="Événements">Événements</Link></li>
            <li><Link to="/projects" className="hover:text-blue-200 transition duration-200" aria-label="Projets">Projets</Link></li>
            <li><Link to="/blog" className="hover:text-blue-200 transition duration-200" aria-label="Blog">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-blue-200 transition duration-200" aria-label="Contact">Contact</Link></li>
          </ul>
        </div>

        {/* Menu secondaire (connexion / déconnexion) */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-blue-200 transition duration-200"
              aria-label="Déconnexion"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition duration-200" aria-label="Connexion">
                Connexion
              </Link>
              <Link to="/register" className="hover:text-blue-200 transition duration-200" aria-label="Rejoindre">
                Rejoindre
              </Link>
            </>
          )}
        </div>

        {/* Icône menu pour petits écrans */}
        <div className="md:hidden">
          <button aria-label="Menu" className="cursor-pointer">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
