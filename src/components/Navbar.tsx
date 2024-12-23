import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Event Dashboard</span>
          </Link>
          <Link
            to="/events/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create Event
          </Link>
        </div>
      </div>
    </nav>
  );
}