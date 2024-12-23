import { Request, Response } from 'express';
import * as taskService from '../services/taskService.js';

export async function createTask(req: Request, res: Response) {
  try {
    const result = await taskService.createTask(req.body);
    req.io.emit('taskCreated');
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
}

export async function getEventTasks(req: Request, res: Response) {
  try {
    const tasks = await taskService.getEventTasks(Number(req.params.eventId));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function updateTaskStatus(req: Request, res: Response) {
  try {
    await taskService.updateTaskStatus(Number(req.params.id), req.body.status);
    req.io.emit('taskUpdated');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
}