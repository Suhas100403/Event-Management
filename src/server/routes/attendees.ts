import { Router } from 'express';
import { validateAttendee } from '../validators/attendeeValidator.js';
import * as attendeeController from '../controllers/attendeeController.js';

const router = Router();

router.post('/', validateAttendee, attendeeController.createAttendee);
router.get('/', attendeeController.getAttendees);
router.delete('/:id', attendeeController.deleteAttendee);

export default router;