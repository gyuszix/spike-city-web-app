// src/components/TeamCards/TeamCards.js
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import teamMembers from './teamMembers';
import './TeamCards.css';

/**
 * Displays a set of team member cards with front and back sides.
 * Front shows the name; back shows social links (LinkedIn, GitHub, Email).
 * 
 * @returns {JSX.Element} The container with all team member cards.
 */
export default function TeamCards() {
  return (
    <div className="team-cards-container">
      {teamMembers.map(person => (
        <div key={person.name} className="team-card">
          <div className="team-card-inner">
            <div className="card-side front">
              <h3>{person.name}</h3>
            </div>
            <div className="card-side back">
              <h4>Contact</h4>
              <div className="social-icons">
                <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={person.links.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href={`mailto:${person.links.email}`}>
                  <FaEnvelope /> 
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}