import React from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { api } from '../../hooks/useApi';
import { X } from 'lucide-react';
import { Attendee } from '../../types';

interface TaskFormProps {
  eventId: number;
  onClose: () => void;
}

export default function TaskForm({ eventId, onClose }: TaskFormProps) {
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<string | null>(null);

  const { data: attendees } = useQuery<Attendee[]>(['attendees', eventId], async () => {
    const { data } = await api.get(`/attendees?event_id=${eventId}`);
    return data;
  });

  const addTask = useMutation(
    async (formData: FormData) => {
      const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        assignee_id: formData.get('assignee_id'),
        event_id: eventId,
      };
      await api.post('/tasks', taskData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', eventId]);
        onClose();
      },
      onError: (err: Error) => {
        setError(err.message);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    addTask.mutate(new FormData(e.currentTarget));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Task</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="assignee_id" className="block text-sm font-medium text-gray-700">
              Assignee
            </label>
            <select
              id="assignee_id"
              name="assignee_id"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select an assignee</option>
              {attendees?.map((attendee) => (
                <option key={attendee.id} value={attendee.id}>
                  {attendee.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={addTask.isLoading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {addTask.isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
}