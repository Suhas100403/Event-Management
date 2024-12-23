import { Request, Response, NextFunction } from 'express';

export function validateTask(req: Request, res: Response, next: NextFunction) {
  const { title, event_id, assignee_id } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!event_id) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  if (!assignee_id) {
    return res.status(400).json({ error: 'Assignee ID is required' });
  }

  next();
}

export function validateTaskStatus(req: Request, res: Response, next: NextFunction) {
  const { status } = req.body;
  const validStatuses = ['pending', 'in-progress', 'completed'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  next();
}