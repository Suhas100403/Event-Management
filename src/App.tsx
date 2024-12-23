import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import CreateEvent from './components/CreateEvent';
import LoginForm from './components/auth/LoginForm';
import ServerStatus from './components/shared/ServerStatus';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      staleTime: 30000,
      onError: (error) => {
        // Safe error logging
        console.error('Query error:', error instanceof Error ? error.message : 'Unknown error');
      }
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error instanceof Error ? error.message : 'Unknown error');
      }
    }
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <>
                      <Navbar />
                      <main className="container mx-auto px-4 py-8">
                        <EventList />
                      </main>
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/events/new"
                element={
                  <PrivateRoute>
                    <>
                      <Navbar />
                      <main className="container mx-auto px-4 py-8">
                        <CreateEvent />
                      </main>
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <PrivateRoute>
                    <>
                      <Navbar />
                      <main className="container mx-auto px-4 py-8">
                        <EventDetails />
                      </main>
                    </>
                  </PrivateRoute>
                }
              />
            </Routes>
            <ServerStatus />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}