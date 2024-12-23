import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api';
import { Event } from '../types';

export function useEvents() {
  const queryClient = useQueryClient();

  const { data: events, isLoading, error } = useQuery<Event[]>(
    'events',
    async () => {
      const { data } = await api.get('/events');
      return data;
    },
    {
      retry: 1,
      retryDelay: 1000,
      onError: (error) => {
        console.error('Failed to fetch events:', error);
      }
    }
  );

  const createEvent = useMutation(
    async (eventData: Omit<Event, 'id' | 'created_at'>) => {
      const { data } = await api.post('/events', eventData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events');
      },
      onError: (error) => {
        console.error('Failed to create event:', error);
      }
    }
  );

  return {
    events,
    isLoading,
    error: error instanceof Error ? error.message : 'An error occurred',
    createEvent,
  };
}