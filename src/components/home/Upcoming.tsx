import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

export const Upcoming: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('/api/events'); // Remplacez par l'URL de votre API
        setEvents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Événements à Venir</h2>
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="border rounded-lg overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full object-cover h-48"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {new Date(event.date).toLocaleDateString()} - {event.description}
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700">
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Aucun événement à venir pour le moment.</p>
        )}
      </div>
    </div>
  );
};
