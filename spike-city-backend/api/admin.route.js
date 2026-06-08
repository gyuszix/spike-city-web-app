import express from 'express';
import AdminController from './admin.controller.js';

const router = express.Router();
// Get acces to express router

// POST /api/v1/admin/events
router.route('/events').post(AdminController.apiCreateEvent);

// PUT /api/v1/admin/events/:id
router.route('/events/:eventNum').put(AdminController.apiUpdateEvent);

// DELETE /api/v1/admin/events/:id
router.route('/events/:eventNum').delete(AdminController.apiDeleteEvent);

export default router;
// This file defines the routes for the admin API, linking them to their respective controllers.