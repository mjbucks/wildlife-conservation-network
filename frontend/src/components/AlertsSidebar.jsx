import React from 'react';
import '../styles/AlertsSidebar.css';

function AlertsSidebar({ alerts, activeFilter, setActiveFilter, setSelectedAlert }) {
  // Filter options for the dropdown
  const filterOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'unacknowledged', label: 'Unacknowledged' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'ignored', label: 'Ignored' },
    { value: 'dispatched', label: 'Dispatched' }
  ];

  // Filter alerts based on activeFilter
  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.status === activeFilter);

  return (
    <div className="alerts-sidebar">
      <div className="alerts-header">
        <h2>Recent Alerts</h2>
        <select 
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="filter-select"
        >
          {filterOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="alerts-list">
        {filteredAlerts.map(alert => (
          <div 
            key={alert.id}
            className={`alert-item ${alert.status}`}
            onClick={() => setSelectedAlert(alert)}
          >
            <div className="alert-content">
              <div className="alert-type">
                {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
              </div>
              <div className="alert-location">{alert.location}</div>
              <div className="alert-status">
                {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
              </div>
              <div className="alert-time">{alert.time}</div>
              <div className="alert-confidence">
                Confidence: {alert.confidence}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertsSidebar; 