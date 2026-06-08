import React, { useMemo } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import './NextEventCountdown.css';

/**
 * Displays a countdown timer to the next upcoming event.
 * Shows tiny subscript labels (dd, hh, mm, ss) under each number.
 */
const NextEventCountdown = ({ events = [] }) => {
  const nextEventDate = useMemo(() => {
    const now = new Date();
    const upcoming = events
      .map((evt) => new Date(evt.date))
      .filter((date) => date > now)
      .sort((a, b) => a - b);
    return upcoming.length > 0 ? upcoming[0] : null;
  }, [events]);

  if (!nextEventDate) return null;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) return <div className="countdown-complete">Game time!</div>;

    return (
      <div className="countdown-container">
        <div className="countdown-digits">
          <div className="digit-block">
            <span className="digits">{zeroPad(days, 2)}</span>
            <span className="sub">dd</span>
          </div>
          <span className="sep">:</span>
          <div className="digit-block">
            <span className="digits">{zeroPad(hours, 2)}</span>
            <span className="sub">hh</span>
          </div>
          <span className="sep">:</span>
          <div className="digit-block">
            <span className="digits">{zeroPad(minutes, 2)}</span>
            <span className="sub">mm</span>
          </div>
          <span className="sep">:</span>
          <div className="digit-block">
            <span className="digits">{zeroPad(seconds, 2)}</span>
            <span className="sub">ss</span>
          </div>
        </div>
      </div>
    );
  };

  return <Countdown date={nextEventDate} renderer={renderer} />;
};

export default NextEventCountdown;