// frontend/src/components/NotificationSystem/NotificationBell.js

import React from 'react';
import { FiBell } from 'react-icons/fi';
import './NotificationBell.css';

/**
 * Notification bell button showing unread count badge.
 * 
 * @param {Object} props
 * @param {number} [props.unread=0] - Number of unread notifications.
 * @param {function} props.onClick - Click handler for the button.
 * 
 * @returns {JSX.Element} Notification bell button with optional badge.
 */
export default function NotificationBell({ unread = 0, onClick }) {
  return (
    <button
      type="button"
      className="vb-bell"
      aria-label={unread ? `Notifications (${unread} unread)` : 'Notifications'}
      onClick={onClick}
    >
      <FiBell size={28} />
      {unread > 0 && <span className="vb-badge">{unread}</span>}
    </button>
  );
}