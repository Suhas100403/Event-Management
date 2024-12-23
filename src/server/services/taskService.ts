import db from '../db.js';
import { Task } from '../../types';

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'status'>) {
  return await db.execute({
    sql: `INSERT INTO tasks (title, description, event_id, assignee_id, status) 
          VALUES (?, ?, ?, ?, 'pending')`,
    args: [task.title, task.description, task.event_id, task.assignee_id]
  });
}

export async function getEventTasks(eventId: number) {
  const result = await db.execute({
    sql: `SELECT t.*, a.name as assignee_name 
          FROM tasks t 
          LEFT JOIN attendees a ON t.assignee_id = a.id 
          WHERE t.event_id = ? 
          ORDER BY t.created_at DESC`,
    args: [eventId]
  });
  return result.rows;
}

export async function updateTaskStatus(id: number, status: Task['status']) {
  await db.execute({
    sql: 'UPDATE tasks SET status = ? WHERE id = ?',
    args: [status, id]
  });
}