import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';
import { Event } from '../../types';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDayClick: (date: Date) => void;
}

export default function CalendarGrid({ currentDate, events, onDayClick }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
          {day}
        </div>
      ))}
      {days.map((day) => {
        const dayEvents = events.filter((event) => 
          isSameDay(new Date(event.date), day)
        );
        
        return (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            events={dayEvents}
            onClick={() => onDayClick(day)}
          />
        );
      })}
    </div>
  );
}