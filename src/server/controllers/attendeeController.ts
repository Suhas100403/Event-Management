import { Request, Response } from 'express';
import * as attendeeService from '../services/attendeeService.js';

export async function createAttendee(req: Request, res: Response) {
  try {
    const result = await attendeeService.createAttendee(req.body);
    req.io.emit('attendeeAdded');
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create attendee' });
  }
}

export async function getAttendees(req: Request, res: Response) {
  try {
    const eventId = req.query.event_id ? Number(req.query.event_id) : undefined;
    const attendees = await attendeeService.getAttendees(eventId);
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendees' });
  }
}

export async function deleteAttendee(req: Request, res: Response) {
  try {
    await attendeeService.deleteAttendee(Number(req.params.id));
    req.io.emit('attendeeDeleted');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete attendee' });
  }
}