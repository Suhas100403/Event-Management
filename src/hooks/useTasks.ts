import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Task } from '../types';

const API_URL = 'http://localhost:3000/api';

export function useTasks(eventId: number) {
  const queryClient = useQueryClient();
  const queryKey = ['tasks', eventId];

  const { data: tasks, isLoading, error } = useQuery<Task[]>(
    queryKey,
    async () => {
      const { data } = await axios.get(`${API_URL}/tasks/event/${eventId}`);
      return data;
    }
  );

  const createTask = useMutation(
    async (taskData: Omit<Task, 'id' | 'created_at' | 'status'>) => {
      const { data } = await axios.post(`${API_URL}/tasks`, taskData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  const updateTaskStatus = useMutation(
    async ({ taskId, status }: { taskId: number; status: Task['status'] }) => {
      const { data } = await axios.put(`${API_URL}/tasks/${taskId}`, { status });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTaskStatus,
  };
}