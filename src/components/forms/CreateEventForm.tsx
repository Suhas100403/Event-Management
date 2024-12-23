import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ListPlus, X } from 'lucide-react';
import axios from 'axios';
import { Attendee, Task } from '../../types';

interface InitialData {
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: Omit<Attendee, 'id' | 'created_at' | 'event_id'>[];
  tasks: Omit<Task, 'id' | 'created_at' | 'event_id' | 'status'>[];
}

export default function CreateEventForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<InitialData['attendees']>([]);
  const [tasks, setTasks] = useState<InitialData['tasks']>([]);

  const createEvent = useMutation(
    async (formData: any) => {
      const { data: event } = await axios.post('http://localhost:3000/api/events', {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        location: formData.get('location'),
      });

      // Create attendees
      await Promise.all(
        attendees.map((attendee) =>
          axios.post('http://localhost:3000/api/attendees', {
            ...attendee,
            event_id: event.id,
          })
        )
      );

      // Create tasks
      await Promise.all(
        tasks.map((task) =>
          axios.post('http://localhost:3000/api/tasks', {
            ...task,
            event_id: event.id,
            status: 'pending',
          })
        )
      );

      return event;
    },
    {
      onSuccess: () => navigate('/'),
      onError: (error: any) => {
        setError(error.response?.data?.error || 'Failed to create event');
      },
    }
  );

  const handleAddAttendee = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    setAttendees([
      ...attendees,
      {
        name: formData.get('attendeeName') as string,
        email: formData.get('attendeeEmail') as string,
      },
    ]);
    form.reset();
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    setTasks([
      ...tasks,
      {
        title: formData.get('taskTitle') as string,
        description: formData.get('taskDescription') as string,
        assignee_id: parseInt(formData.get('assigneeId') as string),
      },
    ]);
    form.reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    createEvent.mutate(new FormData(e.target as HTMLFormElement));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
        )}

        {/* Event Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Attendees Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Attendees</h2>
          </div>

          <div className="space-y-4">
            {attendees.map((attendee, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div>
                  <p className="font-medium">{attendee.name}</p>
                  <p className="text-sm text-gray-600">{attendee.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAttendees(attendees.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}

            <form onSubmit={handleAddAttendee} className="flex gap-2">
              <input
                type="text"
                name="attendeeName"
                placeholder="Name"
                required
                className="flex-1 rounded-md border-gray-300"
              />
              <input
                type="email"
                name="attendeeEmail"
                placeholder="Email"
                required
                className="flex-1 rounded-md border-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </form>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <ListPlus className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">Tasks</h2>
          </div>

          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}

            <form onSubmit={handleAddTask} className="space-y-3">
              <input
                type="text"
                name="taskTitle"
                placeholder="Task Title"
                required
                className="w-full rounded-md border-gray-300"
              />
              <textarea
                name="taskDescription"
                placeholder="Task Description"
                className="w-full rounded-md border-gray-300"
              />
              <select
                name="assigneeId"
                required
                className="w-full rounded-md border-gray-300"
              >
                <option value="">Select Assignee</option>
                {attendees.map((attendee, index) => (
                  <option key={index} value={index}>
                    {attendee.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          disabled={createEvent.isLoading}
        >
          {createEvent.isLoading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}