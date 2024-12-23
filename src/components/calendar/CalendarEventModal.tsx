import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import CreateEvent from '../CreateEvent';

interface CalendarEventModalProps {
  date: Date;
  onClose: () => void;
}

export default function CalendarEventModal({ date, onClose }: CalendarEventModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Create Event for {format(date, 'MMMM d, yyyy')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <CreateEvent initialDate={date} onSuccess={onClose} />
      </div>
    </div>
  );
}