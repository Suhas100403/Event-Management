import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { api } from '../hooks/useApi';
import { Event } from '../types';
import ActionButton from './shared/ActionButton';
import AttendeeForm from './forms/AttendeeForm';
import TaskForm from './forms/TaskForm';
import AttendeeList from './attendees/AttendeeList';
import TaskList from './tasks/TaskList';
import LoadingSpinner from './shared/LoadingSpinner';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [showAttendeeForm, setShowAttendeeForm] = React.useState(false);
  const [showTaskForm, setShowTaskForm] = React.useState(false);

  const { data: event, isLoading } = useQuery<Event>(['event', id], async () => {
    const { data } = await api.get(`/events/${id}`);
    return data;
  });

  if (isLoading || !event) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-6">{event.description}</p>
        <div className="flex items-center space-x-6 text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          {event.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Attendees</h2>
            </div>
            <ActionButton 
              type="attendee" 
              onClick={() => setShowAttendeeForm(true)} 
            />
          </div>
          <AttendeeList eventId={Number(id)} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Tasks</h2>
            </div>
            <ActionButton 
              type="task" 
              onClick={() => setShowTaskForm(true)} 
            />
          </div>
          <TaskList eventId={Number(id)} />
        </div>
      </div>

      {showAttendeeForm && (
        <AttendeeForm 
          eventId={Number(id)} 
          onClose={() => setShowAttendeeForm(false)} 
        />
      )}

      {showTaskForm && (
        <TaskForm 
          eventId={Number(id)} 
          onClose={() => setShowTaskForm(false)} 
        />
      )}
    </div>
  );
}