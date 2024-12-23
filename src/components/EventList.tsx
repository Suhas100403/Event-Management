import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, List } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import CalendarView from './calendar/CalendarView';
import EventCard from './events/EventCard';
import { useRealtime } from '../hooks/useRealtime';

export default function EventList() {
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list');
  const { events, isLoading } = useEvents();
  useRealtime(); // Setup real-time updates

  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-md ${
              viewMode === 'calendar' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'
            }`}
          >
            <CalendarIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <CalendarView />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}