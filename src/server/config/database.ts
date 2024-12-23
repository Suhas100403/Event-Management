import { createClient } from '@libsql/client';
import { logError, logInfo } from '../utils/logger.js';

export const db = createClient({
  url: 'file:events.db',
});

export async function initializeDatabase() {
  try {
    // Create events table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL,
        location TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create attendees table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS attendees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        event_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      )
    `);

    // Create tasks table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        event_id INTEGER,
        assignee_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        FOREIGN KEY (assignee_id) REFERENCES attendees(id) ON DELETE SET NULL
      )
    `);

    logInfo('Database initialized successfully');
  } catch (error) {
    logError(error as Error, 'Database initialization failed');
    throw error;
  }
}