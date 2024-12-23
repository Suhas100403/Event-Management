import { Router } from 'express';
import eventRoutes from '../routes/events.js';
import attendeeRoutes from '../routes/attendees.js';
import taskRoutes from '../routes/tasks.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount API routes
router.use('/events', eventRoutes);
router.use('/attendees', attendeeRoutes);
router.use('/tasks', taskRoutes);

export default router;