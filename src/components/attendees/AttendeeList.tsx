import React from 'react';
import { Attendee } from '../../types';
import { UserX } from 'lucide-react';

interface AttendeeListProps {
  attendees: Attendee[];
  onDelete?: (id: number) => void;
}

export default function AttendeeList({ attendees, onDelete }: AttendeeListProps) {
  return (
    <div className="space-y-3">
      {attendees.map((attendee) => (
        <div
          key={attendee.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
        >
          <div>
            <h4 className="font-medium">{attendee.name}</h4>
            <p className="text-sm text-gray-600">{attendee.email}</p>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(attendee.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove attendee"
            >
              <UserX className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}