import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MainLayout } from '@/layouts/MainLayout';
import { Calendar, MapPin, Users, Search } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  maxParticipants: number;
  type: string;
  imageUrl: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tous les types');
  const [filterRegion, setFilterRegion] = useState('Toutes les régions');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des événements :', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Tous les types' || event.type === filterType.toLowerCase();
    const matchesRegion = filterRegion === 'Toutes les régions' || event.location.includes(filterRegion);

    return matchesSearch && matchesType && matchesRegion;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Événements GNDC</h1>
            <p className="text-xl text-blue-100">Découvrez et participez à nos prochains événements</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher un événement..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="border rounded-lg px-4 py-2"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>Tous les types</option>
                <option>Hackathon</option>
                <option>Formation</option>
                <option>Meetup</option>
              </select>
              <select
                className="border rounded-lg px-4 py-2"
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
              >
                <option>Toutes les régions</option>
                <option>Adamaoua</option>
                <option>Extrême-Nord</option>
                <option>Nord</option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className={`text-sm font-semibold mb-2 text-${event.type.toLowerCase()}`}>
                      {event.type.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="space-y-3 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-2" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={18} className="mr-2" />
                        <span>{event.maxParticipants} participants</span>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      S'inscrire
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">Aucun événement trouvé.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
