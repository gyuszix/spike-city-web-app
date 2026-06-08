import { useState, useCallback, useEffect } from 'react';
import EventsDataService from '../services/events';

/**
 * Custom hook for fetching events.
 *
 * @param {Object} user - The user object used to filter or authorize event fetching.
 * @returns {{ events: Array, fetchEvents: Function }} The list of events and a refetch function.
 */
const useEventsList = (user) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = useCallback(() => {

    if(!user || !user.sub) {
      console.log('User not found');
      return;
    }

    EventsDataService.getEvents(user.sub)
      .then((response) => {
        //console.log("EVENTS: ", response.data);
        const sortedEvents = response.data.events.slice().sort((a, b) => a.num - b.num);
        setEvents(sortedEvents);
      })
      .catch((e) => {
        console.error("Failed to fetch events:", e);
      });
  }, [user]);

  useEffect(() => {
    if (!user || !user.sub) {
      return;
    }
    fetchEvents();
  }, [fetchEvents, user]);

  return { events, fetchEvents };
};

export default useEventsList;