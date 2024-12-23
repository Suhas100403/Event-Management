import React from 'react';
import { Task } from '../../types';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onUpdateStatus: (taskId: number, status: Task['status']) => void;
}

const statusIcons = {
  pending: Circle,
  'in-progress': Clock,
  completed: CheckCircle,
};

const statusColors = {
  pending: 'text-gray-500',
  'in-progress': 'text-blue-500',
  completed: 'text-green-500',
};

export default function TaskList({ tasks, onUpdateStatus }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const StatusIcon = statusIcons[task.status];
        const statusColor = statusColors[task.status];

        return (
          <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                <h4 className="font-medium">{task.title}</h4>
              </div>
              {task.description && (
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
              )}
              {task.assignee_name && (
                <p className="mt-1 text-sm text-gray-500">
                  Assigned to: {task.assignee_name}
                </p>
              )}
            </div>
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(task.id, e.target.value as Task['status'])}
              className="ml-4 rounded-md border-gray-300 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        );
      })}
    </div>
  );
}