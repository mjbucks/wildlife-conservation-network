import React from 'react';
import '../styles/AlertNotification.css';

const AlertNotification = ({ alert, onAction }) => {
  if (!alert) return null;

  return (
    <div className="alert-notification">
      <h3>New Alert: {alert.type.toUpperCase()}</h3>
      <p>Location: {alert.location}</p>
      <p>Time: {alert.time}</p>
      <p>Confidence: {alert.confidence}</p>
      <div className="alert-actions">
        <button onClick={() => onAction(alert.id, 'acknowledged')}>
          Acknowledge
        </button>
        <button onClick={() => onAction(alert.id, 'dispatched')}>
          Dispatch Team
        </button>
        <button onClick={() => onAction(alert.id, 'ignored')}>
          Ignore
        </button>
      </div>
    </div>
  );
};

export default AlertNotification; 