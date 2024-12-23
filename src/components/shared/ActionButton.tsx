import React from 'react';
import { UserPlus, ListPlus } from 'lucide-react';

interface ActionButtonProps {
  type: 'task' | 'attendee';
  onClick: () => void;
}

export default function ActionButton({ type, onClick }: ActionButtonProps) {
  const Icon = type === 'task' ? ListPlus : UserPlus;
  const label = type === 'task' ? 'Add Task' : 'Add Attendee';
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}