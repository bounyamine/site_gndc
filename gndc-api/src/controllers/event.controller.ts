// src/controllers/event.controller.ts
import { Request, Response } from 'express';
import Event from '../models/event.model';

const getEvents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    throw error; // Throw the error to be caught by the global error middleware
  }
};

const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    throw error; // Throw the error to be caught by the global error middleware
  }
};

const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({ message: 'Event created', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Creating event failed', error });
  }
};

const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ message: 'Event updated', event });
  } catch (error) {
    res.status(500).json({ message: 'Updating event failed', error });
  }
};

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Deleting event failed', error });
  }
};

export { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
