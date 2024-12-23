import React from 'react';
import { format } from 'date-fns';
import { Event } from '../../types';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  onClick: () => void;
}

export default function CalendarDay({ date, events, onClick }: CalendarDayProps) {
  return (
    <div
      onClick={onClick}
      className="min-h-24 p-2 border border-gray-200 hover:bg-gray-50 cursor-pointer"
    >
      <div className="font-medium text-sm text-gray-500">
        {format(date, 'd')}
      </div>
      <div className="mt-1 space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className="text-xs p-1 bg-indigo-100 text-indigo-700 rounded truncate"
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}