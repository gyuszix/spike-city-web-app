import EventsDAO from '../dao/eventsDAO.js';

/**
 * Controller for handling API requests related to events which require admin privledges.
 * This contoller needs to be different from the events controller becuase:
 * - Admin and user routes have different permissions (and logic)
 * - It is a clear seperation of concerns
 * - We can more easily add Admin verifying middleware to these routes
 */
export default class AdminController {

    /**
     * Handles POST requests to create an event.
     */
    static async apiCreateEvent(req, res, next) {
        try {
            const event = req.body;           
            const created = await EventsDAO.createEvent(event);
            if (created) {
                res.json({ created });
            } else {
                return res.status(404).json({ error: `Error: Event creating event: ${event}` });
            }
        } catch (e) {
            console.error(`apiCreateEvent error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * Handles PUT requests to modify an existing event.
     */
    static async apiUpdateEvent(req, res, next) {
        try {
            const event = req.body;
            const num = parseInt(req.params.eventNum);
            //console.log(`event: ${JSON.stringify(event)}`);
            //console.log(`num: ${num}`);
            const updated = await EventsDAO.updateEvent(num, event);
            if (updated) {
                res.json({ updated });
            } else {
                return res.status(404).json({ error: `Error: Event updating event: ${event}` });
            }
        } catch (e) {
            console.error(`apiUpdateEvent error: ${e}`);
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * Handles DEL requests to delete an existing event.
     */
    static async apiDeleteEvent(req, res, next) {
        try {
            const eventNum = req.params.eventNum;
            const deleted = await EventsDAO.deleteEventByNum(eventNum);
            if (deleted) {
                res.json({ eventNum });
            } else {
                return res.status(404).json({ error: `Error: Event ${eventNum} not found` });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }

}