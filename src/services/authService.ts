import { User } from '../types/auth';
import api from '../utils/api';

export async function login(email: string, password: string): Promise<User> {
  try {
    // For demo purposes, simulate authentication
    if (email && password) {
      // In a real app, this would be an API call
      return {
        id: 1,
        email,
        name: email.split('@')[0],
      };
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Authentication failed');
  }
}