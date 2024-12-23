import { Request, Response, NextFunction } from 'express';
import { ValidationError, DatabaseError } from '../utils/errors.js';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`[Error] ${err.name}: ${err.message}`);
  
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  
  if (err instanceof DatabaseError) {
    return res.status(500).json({ error: 'Database operation failed' });
  }
  
  res.status(500).json({ error: 'Internal server error' });
}