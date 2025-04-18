import React, { useState } from 'react';
import '../styles/AlertsSidebar.css';

function AlertsSidebar({ alerts, onAlertSelect }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    if (statusFilter === 'all') return true;
    return alert.status === statusFilter;
  });

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatCoordinates = (coords) => {
    return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
  }

  return (
    <div className="alerts-sidebar">
      <h2>Recent Alerts</h2>
      <div className="status-filter">
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Alerts</option>
          <option value="unacknowledged">Unacknowledged</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="dispatched">Dispatched</option>
          <option value="ignored">Ignored</option>
        </select>
      </div>
      <div className="alerts-list">
        {filteredAlerts.map(alert => (
          <div 
            key={alert._id} 
            className={`alert-card ${alert.status}`}
            onClick={() => onAlertSelect(alert)}
          >
            <div className="alert-header">
              <span className={`alert-type ${alert.type}`}>{alert.type}</span>
              <span className="alert-time">{formatTime(alert.timestamp)}</span>
            </div>
            <div className="alert-details">
              <p><strong>Node:</strong> {alert.nodeId}</p>
              <p><strong>Location:</strong> {alert.location}</p>
              <p><strong>Coordinates:</strong> {formatCoordinates(alert.coordinates)}</p>
              <p><strong>Confidence:</strong> {(alert.confidence * 100).toFixed(1)}%</p>
              <p><strong>Status:</strong> {alert.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsSidebar;
