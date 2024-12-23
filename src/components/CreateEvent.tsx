import React from 'react';
import CreateEventForm from './forms/CreateEventForm';

export default function CreateEvent() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
      <CreateEventForm />
    </div>
  );
}