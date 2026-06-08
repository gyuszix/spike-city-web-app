import EventsDAO from '../dao/eventsDAO.js';

/**
 * Controller for handling API requests related to events.
 */
export default class EventsController {

    /**
     * Handles GET requests to retrieve events for a specific user.
     */
    static async apiGetEvents(req, res, next) {
        try {
            const id = req.query.userId;
            if (!id){
                return res.status(400).json({ error: "Missing userId" });
            }

            let events = await EventsDAO.getEvents(id);
            if (!events) {
                events = [];
            }

            //console.log("Fetched events from DB:", events);

            res.json({events});

        } catch (e) {
            console.log("API", e);
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * Handles POST requests to update events "attendees" info for a specific user.
     */
    static async apiRSVP(req, res, next) {
        try {
            const { id, eventNum } = req.body;

            if (!id) {
                return res.status(400).json({ error: "Missing User ID" });
            }
            if (!eventNum) {
                return res.status(400).json({ error: "Missing Event Number" });
            }

            let rsvpStatus = await EventsDAO.rsvp(id, eventNum);

            res.json({rsvpStatus});

        } catch (e) {
            console.log("API", e);
            res.status(500).json({ error: e.message });
        }
    }
}