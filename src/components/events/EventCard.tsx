import React from 'react';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onDelete?: (id: number) => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link to={`/events/${event.id}`}>
            <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
              {event.title}
            </h3>
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap gap-4 text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          {event.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}