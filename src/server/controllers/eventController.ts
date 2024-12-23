import { Request, Response } from 'express';
import * as eventService from '../services/eventService.js';

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const event = await eventService.getEvent(Number(req.params.id));
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const result = await eventService.createEvent(req.body);
    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    await eventService.updateEvent(Number(req.params.id), req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    await eventService.deleteEvent(Number(req.params.id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
}