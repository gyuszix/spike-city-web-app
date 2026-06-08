// frontend/src/components/NotificationSystem/NotificationSystem.js
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import NotificationBanner from './NotificationBanner';
import useEventChangeAlerts from '../../hooks/userEventChangeAlerts';
import EventsDataService from '../../services/events';

/**
 * Notification system that shows a bell icon with unread count in the navbar
 * and a banner below the navbar when there are event changes.
 * Clicking the bell navigates the user to the relevant event details or event list.
 * 
 * @param {Object} props
 * @param {Object} props.user - The logged-in user object.
 * 
 * @returns {JSX.Element} Notification bell and banner components.
 */
export default function NotificationSystem({ user }) {
  const navigate = useNavigate();
  const { unread, banner, changedIds, markSeen } = useEventChangeAlerts(user);

  // Create a DOM host right AFTER the navbar for the banner
  const hostRef = useRef(null);
  useEffect(() => {
    const nav = document.querySelector('.custom-navbar'); // your Navbar has this class
    if (!nav) return;

    if (!hostRef.current) {
      const host = document.createElement('div');
      host.className = 'vb-banner-host';
      nav.parentNode.insertBefore(host, nav.nextSibling); // insert after navbar
      hostRef.current = host;
    }

    return () => {
      if (hostRef.current && hostRef.current.parentNode) {
        hostRef.current.parentNode.removeChild(hostRef.current);
      }
      hostRef.current = null;
    };
  }, []);

  const handleBellClick = async () => {
    markSeen();
    if (!user?.sub) return;

    if (changedIds.length === 1) {
      try {
        const res = await EventsDataService.getEvents(user.sub);
        const list = Array.isArray(res?.data?.events) ? res.data.events
                  : Array.isArray(res?.data)        ? res.data
                  : [];
        const ev = list.find(e => String(e?.num) === String(changedIds[0]));
        if (ev) {
          navigate(`/events/eventDetails/${changedIds[0]}`, { state: { event: ev } });
        } else {
          navigate(`/events/${user.sub}`);
        }
      } catch (err) {
        console.error('Failed to load event for bell nav:', err);
        navigate(`/events/${user.sub}`);
      }
    } else {
      navigate(`/events/${user.sub}`);
    }
  };

  return (
    <>
      {/* Bell stays in the navbar */}
      {user && (
        <div className="me-2">
          <NotificationBell unread={unread} onClick={handleBellClick} />
        </div>
      )}

      {/* Banner renders UNDER the navbar via portal */}
      {banner && hostRef.current
        ? createPortal(
            <NotificationBanner
              show={banner}
              message="Looks like an event you're going to has changed! Click the bell icon to see the details."
            />,
            hostRef.current
          )
        : null}
    </>
  );
}