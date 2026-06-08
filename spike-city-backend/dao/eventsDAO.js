//backend/dao/eventsDAO.js
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let eventsCollection;

/**
 * Data Access Object for the Events collection in MongoDB.
 */
export default class EventsDAO {
    /**
     * Initializes the events collection handle.
     *
     * @param {mongodb.MongoClient} conn - The MongoDB connection client.
     * @returns {Promise<void>}
     */
    static async injectDB(conn) {
        if (eventsCollection) {
            return;
        }
        try {
            eventsCollection = await conn.db(process.env.VOLLEYBALL_COLLECTION).collection("events");
        } catch (e) {
            console.error(`Unable to establish a collection handle in eventsDAO: ${e}`);
        }
    }

    /**
     * Retrieves all events from the database, sorted by date in ascending order.
     *
     * @returns {Promise<Array<Object>|{error: string}>} A list of event documents or an error object.
     */
    static async getEvents(userId) {
        try {
            const events = await eventsCollection.find({})
                .sort({ date: 1 })
                .toArray();
                // TODO: filter out events before todays date

            return events;
        } catch (e) {
            console.error(`Unable to get events: ${e}`);
            return { error: e.message };
        }
    }

    /**
     * Creates an event specefied by the event number.
     *
     * @returns {Promise<Object>|{error: string}>} The created event or an error object.
     */
    static async createEvent(event) {
        try {
            // confirm event number is a number
            event.num = Number(event.num);

            //console.log(`events: ${JSON.stringify(event)}`);
            const newNum = await this.getNextNum();

            const newEvent = {
                    num: newNum,
                    date: new Date(event.date),
                    location: event.location,
                    address: event.address,
                    description: event.description,
                    attendees: event.attendees,
            };

            const result = await eventsCollection.insertOne(newEvent);
            return result;

        } catch(e) {
            console.error(`Unable to create event: ${e}`);
            return { error: e.message };
        }
    }

    /**
     * Get the next event number, which is the previous highest event number incremented by one.
     *
     * @returns {Promise<Number>} The next highest number.
     */
    static async getNextNum() {

        // get event with highest num value
        const latestEvent = await eventsCollection
            .find({})
            .sort({ num: -1 })
            .limit(1)
            .toArray(); 

        // this is the first event
        if (latestEvent.length === 0) {
            return 1;
        }

        // add one to the current event num
        return Number(latestEvent[0].num) + 1;
    }

    /**
     * Updates an event's details specefied by the event number.
     *
     * @param {number} num - The event number to update.
     * @param {Object} event - The updated event data.
     * @returns {Promise<Object>|{error: string}>} The updated event or an error object.
     */
    static async updateEvent(num, event) {
        try {
            console.log(`event: ${JSON.stringify(event)}`);
            const updatedEvent = {};
            if (event.num && event.num !== "") {
                updatedEvent.num = Number(event.num);
            }
            if (event.date && event.date !== "") {
                updatedEvent.date = new Date(event.date);
            }
            if (event.location && event.location !== "") {
                updatedEvent.location = event.location;
            }
            if (event.address && event.address !== "") {
                updatedEvent.address = event.address;
            }
            if (event.description && event.description !== "") {
                updatedEvent.description = event.description;
            }
            if (typeof event.attendees !== "undefined" && event.attendees !== "") {
                updatedEvent.attendees = event.attendees;
            }
            console.log(`updated event: ${JSON.stringify(updatedEvent)}`);
            const numInt = parseInt(num, 10);
            const result = await eventsCollection.updateOne({ num: numInt }, { $set: updatedEvent });

            //console.log(JSON.stringify(result));
            return result;

        } catch(e) {
            console.error(`Unable to update events: ${e}`);
            return { error: e.message };
        }
    }

    /**
     * Deletes an event specefied by the event number.
     *
     * @returns {Promise<Object>|{error: string}>} The event number that was deleted or an error object.
     */
    static async deleteEventByNum(eventNum) {
        try {
            //console.log(`events: ${JSON.stringify(eventsCollection)}`);
            const num = parseInt(eventNum, 10);
            const result = await eventsCollection.deleteOne({ num: num });
            console.log(result);
            return result;
        } catch(e) {
            console.error(`Unable to delete event: ${e}`);
            return { error: e.message };
        }
    }

    /**
     * Adds user id to event RSVP list (attendees field) if not already present. Otherwise, removes it.
     *
     * @param {String} id - The user id to be added to the attendees list
     * @param {number} event - The event number to be updated.
     * @returns {Promise<Object>|{error: string}>} The updated event or an error object.
     */
    static async rsvp(id, eventNum) {
        try {
            // get the event by event num
            const event = await eventsCollection.findOne({num: eventNum});
            if (!event) {
                return { error: "Event not found" };
            }

            // get the attendees field
            const attendees = event.attendees;

            var newAttendies;
            if(attendees.includes(id)) {
                // remove user id
                newAttendies = attendees.filter(userId => userId !== id);
            } else {
                // add user id
                newAttendies = [...attendees, id];
            }

            // update the collection with the event with the updated atendees field
            const result = await eventsCollection.updateOne(
                { num: eventNum },
                { $set: { attendees: newAttendies } });

            return result;

        } catch (e) {
            console.error(`Unable to RSVP on event ${eventNum}: ${e}`);
            return { error: e.message };
        }
    }

}