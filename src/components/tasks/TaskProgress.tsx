import React from 'react';
import { Task } from '../../types';

interface TaskProgressProps {
  tasks: Task[];
}

export default function TaskProgress({ tasks }: TaskProgressProps) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'completed').length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Task Progress</h3>
        <span className="text-sm font-medium text-gray-600">
          {completed} of {total} tasks completed
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <div>In Progress: {inProgress}</div>
        <div>Completed: {completed}</div>
      </div>
    </div>
  );
}