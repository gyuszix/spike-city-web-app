/**
 * Represents an event with a time, location, description, and a list of attendees.
 */
class Event {
    /**
     * @param {number} num - The event number or ID.
     * @param {string} date - The event time (e.g., ISO string or formatted).
     * @param {string} location - The event location as a string.
     * @param {string} address - The address of the location as a string.
     * @param {string} description - A description of the event.
     * @param {[number]} attendees - IDs of users who RSVPed.
     */
    constructor(num, date, location, address, description, attendees) {
        this.num = num;
        this.date = date;
        this.location = location;
        this.address = address;
        this.description = description;
        this.attendees = attendees;
    }


}