import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">GNDC</h4>
            <p className="text-gray-400">
              Promouvoir l'innovation technologique dans le Grand Nord du Cameroun
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Accueil</a></li>
              <li><a href="/events" className="hover:text-white">Événements</a></li>
              <li><a href="/projects" className="hover:text-white">Projets</a></li>
              <li><a href="blogs" className="hover:text-white">Blogs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://chat.whatsapp.com/FMUPbBkEKs24B8rE4h9xsh" className="hover:text-white" target='_blank'>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/grand-nord-developers-community/" className="hover:text-white" target='_blank'>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61558885960388&mibextid=LQQJ4d" className="hover:text-white" target='_blank'>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://github.com/Grand-Nord-Developpers-Community" className="hover:text-white" target='_blank'>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Restez informé de nos dernières activités
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded-l-md flex-1 text-gray-900"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-r-md hover:bg-blue-700"
              >
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};