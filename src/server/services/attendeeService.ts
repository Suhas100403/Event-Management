import db from '../db.js';
import { Attendee } from '../../types';

export async function createAttendee(attendee: Omit<Attendee, 'id' | 'created_at'>) {
  return await db.execute({
    sql: 'INSERT INTO attendees (name, email, event_id) VALUES (?, ?, ?)',
    args: [attendee.name, attendee.email, attendee.event_id]
  });
}

export async function getAttendees(eventId?: number) {
  const sql = eventId 
    ? 'SELECT * FROM attendees WHERE event_id = ? ORDER BY created_at DESC'
    : 'SELECT * FROM attendees ORDER BY created_at DESC';
  const args = eventId ? [eventId] : [];
  
  const result = await db.execute({ sql, args });
  return result.rows;
}

export async function deleteAttendee(id: number) {
  await db.execute({
    sql: 'DELETE FROM attendees WHERE id = ?',
    args: [id]
  });
}