import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Attendee } from '../types';

const API_URL = 'http://localhost:3000/api';

export function useAttendees(eventId?: number) {
  const queryClient = useQueryClient();
  const queryKey = eventId ? ['attendees', eventId] : 'attendees';

  const { data: attendees, isLoading, error } = useQuery<Attendee[]>(
    queryKey,
    async () => {
      const url = eventId
        ? `${API_URL}/attendees?event_id=${eventId}`
        : `${API_URL}/attendees`;
      const { data } = await axios.get(url);
      return data;
    }
  );

  const addAttendee = useMutation(
    async (attendeeData: Omit<Attendee, 'id' | 'created_at'>) => {
      const { data } = await axios.post(`${API_URL}/attendees`, attendeeData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const deleteAttendee = useMutation(
    async (id: number) => {
      await axios.delete(`${API_URL}/attendees/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return {
    attendees,
    isLoading,
    error,
    addAttendee,
    deleteAttendee,
  };
}