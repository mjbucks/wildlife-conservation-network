import React from 'react';
import '../styles/AlertNotification.css';

function AlertNotification({ alert, onClose, onAction }) {
  const handleAction = async (status) => {
    await onAction(alert._id, status);
    onClose(); // Ensure the card closes after action
  };

  return (
    <div className="alert-notification">
      <div className="alert-notification-content">
        <h3>Alert Action Required</h3>
        <p>Node: {alert.nodeId}</p>
        <p>Type: {alert.type}</p>
        <p>Location: {alert.location}</p>
        <div className="alert-actions">
          <button onClick={() => handleAction('acknowledged')}>
            Acknowledge
          </button>
          <button onClick={() => handleAction('dispatched')}>
            Dispatch Team
          </button>
          <button onClick={() => handleAction('ignored')} className="ignore-btn">
            Ignore
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertNotification;
