import { User } from '../types/auth.js';
import { DatabaseError } from '../utils/errors.js';

export async function login(email: string, password: string): Promise<User> {
  try {
    // For demo purposes, simulate authentication
    // In production, this would validate against a database
    if (email && password) {
      return {
        id: 1,
        email,
        name: email.split('@')[0],
      };
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw new DatabaseError('Authentication failed');
  }
}