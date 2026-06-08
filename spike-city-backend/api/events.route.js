import express from 'express';
import EventsController from './events.controller.js';

const router = express.Router();
// Get acces to express router

// Get the full list of events
router.route('/').get(EventsController.apiGetEvents);

// toggle a user rsvp for an event
router.route('/rsvp').post(EventsController.apiRSVP);

export default router;
// This file defines the routes for the events API, linking them to their respective controllers.