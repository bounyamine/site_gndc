import React from 'react';
import { EventCard } from './EventCard';

interface Event {
    _id: string;
    title: string;
    description: string;
    type: 'hackathon' | 'formation' | 'meetup';
    date: Date;
    location: string;
    maxParticipants: number;
    participants: string[];
    status: 'upcoming' | 'ongoing' | 'completed';
  }


// EventList Component
export const EventList: React.FC<{
    events: Event[];
    className?: string;
  }> = ({ events, className = '' }) => {
    return (
      <div className={`grid gap-6 ${className}`}>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">Aucun événement disponible</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    );
  };