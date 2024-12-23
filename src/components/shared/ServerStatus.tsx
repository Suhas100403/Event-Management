import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useApiHealth } from '../../hooks/useApi';

export default function ServerStatus() {
  const { isServerRunning } = useApiHealth();

  if (isServerRunning) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-50 text-red-800 px-4 py-2 rounded-md shadow-lg flex items-center gap-2">
      <AlertCircle className="h-5 w-5" />
      <span>Server is not running. Please start it with:</span>
      <code className="bg-red-100 px-2 py-1 rounded">npm run server:dev</code>
    </div>
  );
}