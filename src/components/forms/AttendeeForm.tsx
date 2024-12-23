import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../hooks/useApi';
import { X } from 'lucide-react';

interface AttendeeFormProps {
  eventId: number;
  onClose: () => void;
}

export default function AttendeeForm({ eventId, onClose }: AttendeeFormProps) {
  const queryClient = useQueryClient();
  const [error, setError] = React.useState<string | null>(null);

  const addAttendee = useMutation(
    async (formData: FormData) => {
      const attendeeData = {
        name: formData.get('name'),
        email: formData.get('email'),
        event_id: eventId,
      };
      await api.post('/attendees', attendeeData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['attendees', eventId]);
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
    addAttendee.mutate(new FormData(e.currentTarget));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Attendee</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={addAttendee.isLoading}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {addAttendee.isLoading ? 'Adding...' : 'Add Attendee'}
          </button>
        </form>
      </div>
    </div>
  );
}