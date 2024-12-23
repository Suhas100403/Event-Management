import { Request, Response, NextFunction } from 'express';

export function validateEvent(req: Request, res: Response, next: NextFunction) {
  const { title, date } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  try {
    new Date(date);
  } catch {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  next();
}