import axios from 'axios';
 
class AdminDataService {

    /**
     * Creates a new event with specified event details.
     *
     * @param {Object} event - The event details.
     * @returns {Promise} Axios promise of the created event.
     */
    createEvent(event) {
        //console.log(`create: ${JSON.stringify(event)}`);
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/events`, event);
    }

    /**
     * Updates an existing event by ID with specified event details.
     *
     * @param {string} eventNum - The number of the event to update.
     * @param {Object} event - The updated event details.
     * @returns {Promise} Axios promise of the updated event.
     */
    updateEvent(eventNum, event) {
        console.log(`update: ${eventNum}, ${JSON.stringify(event)}`);
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/events/${eventNum}`, event);
    }

    /**
     * Deletes an event given a specified event ID.
     *
     * @param {string} eventNum - The number of the event to delete.
     * @returns {Promise} Axios promise of the deleted event status.
     */
    deleteEvent(eventNum) {
        //console.log(`delete: ${eventNum}`);
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/events/${eventNum}`);
    }
}

export default new AdminDataService;