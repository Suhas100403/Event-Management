import { Request, Response, NextFunction } from 'express';

export function validateAttendee(req: Request, res: Response, next: NextFunction) {
  const { name, email, event_id } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email?.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!event_id) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  next();
}