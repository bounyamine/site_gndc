// src/routes/event.routes.ts
import { Router } from 'express';
import Event from '../models/event.model'; // Import the Event model
import { AuthRequest } from '../middleware/auth.middleware'; // Import AuthRequest

import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller';

const router = Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/register', async (req: AuthRequest, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    if (event.participants.includes(req.user._id)) {
      res.status(400).json({ message: 'Already registered for this event' });
      return;
    }

    if (event.maxParticipants > 0 && event.participants.length >= event.maxParticipants) {
      res.status(400).json({ message: 'Event is full' });
      return;
    }

    event.participants.push(req.user._id);
    await event.save();
    
    res.status(201).json({ message: 'Successfully registered for event' });
  } catch (error: any) { // Explicitly type the error
    console.error('Registration error:', error);
    throw error; // Throw the error to be caught by the global error middleware
  }
});

export default router;