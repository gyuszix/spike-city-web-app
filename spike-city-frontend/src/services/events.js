import axios from 'axios';

/**
 * Service for interacting with the Events API.
 */
class EventsDataService {
    /**
     * Fetches events for a specific user.
     *
     * @param {string} userId - The user ID to fetch events for.
     * @returns {Promise} Axios promise resolving to the list of events.
     */
    getEvents(userId) {
        //console.log(`userid: ${userId}`);
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/events`, {params: {userId}});
    }

    /**
     * RSVPs to a particular event
     *
     * @param {string} userId - The user ID to fetch events for.
     * @returns {Promise} Axios promise resolving to the list of events.
     */
    rsvp(id, eventNum) {
        //console.log('Sending RSVP with:', { id, eventNum });
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/events/rsvp`, {id: id, eventNum: eventNum});
    }

}

export default new EventsDataService();