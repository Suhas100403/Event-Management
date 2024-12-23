import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from 'react-query';

const socket = io('http://localhost:3000');

export function useRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('taskUpdated', () => {
      queryClient.invalidateQueries('tasks');
    });

    socket.on('eventCreated', () => {
      queryClient.invalidateQueries('events');
    });

    socket.on('attendeeAdded', () => {
      queryClient.invalidateQueries('attendees');
    });

    return () => {
      socket.off('taskUpdated');
      socket.off('eventCreated');
      socket.off('attendeeAdded');
    };
  }, [queryClient]);

  return socket;
}