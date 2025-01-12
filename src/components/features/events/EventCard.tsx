import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../common';

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

// EventCard Component
export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const isFullyBooked = event.participants.length >= event.maxParticipants;
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{event.title}</h3>
          <span className="text-sm text-gray-500 capitalize">{event.type}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
          event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.status}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{event.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {event.participants.length}/{event.maxParticipants} participants
            </span>
            <Button 
              disabled={isFullyBooked}
              type="submit"
            >
              {isFullyBooked ? 'Complet' : "S'inscrire"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};