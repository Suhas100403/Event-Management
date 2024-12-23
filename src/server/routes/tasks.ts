import { Router } from 'express';
import { validateTask, validateTaskStatus } from '../validators/taskValidator.js';
import * as taskController from '../controllers/taskController.js';

const router = Router();

router.post('/', validateTask, taskController.createTask);
router.get('/event/:eventId', taskController.getEventTasks);
router.put('/:id', validateTaskStatus, taskController.updateTaskStatus);

export default router;