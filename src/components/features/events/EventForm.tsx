import React, { useState } from 'react';
import { Button, Input } from '../../common';

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

// EventForm Component
export const EventForm: React.FC<{
  onSubmit: (eventData: Omit<Event, '_id'>) => void;
}> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'meetup' as Event['type'],
    date: '',
    location: '',
    maxParticipants: 0,
    participants: [] as string[],
    status: 'upcoming' as Event['status']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date(formData.date)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Titre de l'événement"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        
        <textarea
          className="w-full p-2 border rounded-md"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          rows={4}
        />

        <select
          className="w-full p-2 border rounded-md"
          value={formData.type}
          onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
          required
        >
          <option value="meetup">Meetup</option>
          <option value="hackathon">Hackathon</option>
          <option value="formation">Formation</option>
        </select>

        <Input
          type="datetime-local"
          value={formData.date}
          onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
          required
        />

        <Input
          type="text"
          placeholder="Lieu"
          value={formData.location}
          onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />

        {/* <Input
          type="number"
          placeholder="Nombre maximum de participants"
          value={formData.maxParticipants}
          onChange={e => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
          required
          min={1}
        /> */}

        <Button type="submit">Créer l'événement</Button>
      </div>
    </form>
  );
};
