import { Router } from 'express';
import { validateEvent } from '../validators/eventValidator.js';
import * as eventController from '../controllers/eventController.js';

const router = Router();

router.get('/', eventController.getAllEvents);
router.post('/', validateEvent, eventController.createEvent);
router.get('/:id', eventController.getEvent);
router.put('/:id', validateEvent, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;