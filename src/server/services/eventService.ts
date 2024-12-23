import { db } from '../config/database.js';
import { Event } from '../../types';

export async function getAllEvents() {
  const result = await db.execute('SELECT * FROM events ORDER BY date DESC');
  return result.rows;
}

export async function getEvent(id: number) {
  const result = await db.execute({
    sql: 'SELECT * FROM events WHERE id = ?',
    args: [id]
  });
  return result.rows[0];
}

export async function createEvent(event: Omit<Event, 'id' | 'created_at'>) {
  return await db.execute({
    sql: 'INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)',
    args: [event.title, event.description, event.date, event.location]
  });
}

export async function updateEvent(id: number, event: Partial<Event>) {
  await db.execute({
    sql: 'UPDATE events SET title = ?, description = ?, date = ?, location = ? WHERE id = ?',
    args: [event.title, event.description, event.date, event.location, id]
  });
}

export async function deleteEvent(id: number) {
  await db.execute({
    sql: 'DELETE FROM events WHERE id = ?',
    args: [id]
  });
}