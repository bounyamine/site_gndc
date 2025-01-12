import { Mail, Phone, MapPin, Facebook, Github } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
    
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Rejoignez GNDC</h1>
          <p className="text-xl text-blue-100">Devenez membre de notre communauté tech innovante</p>
        </div>
      </div>

      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire d'adhésion */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Formulaire d'Adhésion</h2>
            <form className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Prénom</label>
                  <input
                    type="text"
                    placeholder="Entrez votre prénom"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    placeholder="Entrez votre nom"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <input
                  type="tel"
                  placeholder="+237 123 456 789"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ville</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Sélectionnez votre ville</option>
                  <option>Maroua</option>
                  <option>Garoua</option>
                  <option>Ngaoundéré</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Domaine d'expertise</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option>Choisissez votre domaine</option>
                  <option>Développement Web</option>
                  <option>Développement Mobile</option>
                  <option>DevOps</option>
                  <option>Data Science</option>
                  <option>UI/UX Design</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Dites-nous en plus sur vos motivations..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Envoyer la demande
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="text-blue-600 w-6 h-6 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">contact@gndc.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-blue-600 w-6 h-6 mr-3" />
                  <div>
                    <h3 className="font-medium">Téléphone</h3>
                    <p className="text-gray-600">+237 123 456 789</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-blue-600 w-6 h-6 mr-3" />
                  <div>
                    <h3 className="font-medium">Région</h3>
                    <p className="text-gray-600">Grand Nord, Cameroun</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">Suivez-nous</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://chat.whatsapp.com/FMUPbBkEKs24B8rE4h9xsh"
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-200"
                  target='_blank'
                  >
                  <FaWhatsapp className="text-green-500 w-6 h-6 mr-2" />
                  WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/company/grand-nord-developers-community/"
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-200"
                  target='_blank'
                >
                  <FaLinkedin className="text-blue-700 w-6 h-6 mr-2" />
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61558885960388&mibextid=LQQJ4d"
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-200"
                  target='_blank'
                >
                  <Facebook className="text-blue-600 w-6 h-6 mr-2" />
                  Facebook
                </a>
                <a
                  href="https://github.com/Grand-Nord-Developpers-Community"
                  className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <Github className="text-gray-800 w-6 h-6 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
