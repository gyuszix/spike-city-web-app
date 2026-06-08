// frontend/src/components/NotificationSystem/NotificationBanner.js
import React from 'react';
import './NotificationBanner.css';

/**
 * Displays a notification banner with a message when shown.
 * 
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the banner.
 * @param {string} props.message - The message to display.
 * 
 * @returns {JSX.Element|null} The notification banner or null if not shown.
 */
export default function NotificationBanner({ show, message }) {
  if (!show) return null;
  return <div className="notice-banner">{message}</div>;
}