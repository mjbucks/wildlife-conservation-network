import React from 'react';
import '../styles/AlertsSidebar.css';

const AlertsSidebar = ({ alerts, activeFilter, setActiveFilter, setSelectedAlert }) => {
  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === activeFilter);

  return (
    <aside className="alerts-panel">
      <h2>Recent Alerts</h2>
      <div className="alert-filters">
        <button 
          className={activeFilter === 'all' ? 'active' : ''}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button 
          className={activeFilter === 'gunshot' ? 'active' : ''}
          onClick={() => setActiveFilter('gunshot')}
        >
          Gunshots
        </button>
        <button 
          className={activeFilter === 'chainsaw' ? 'active' : ''}
          onClick={() => setActiveFilter('chainsaw')}
        >
          Chainsaws
        </button>
        <button 
          className={activeFilter === 'vehicle' ? 'active' : ''}
          onClick={() => setActiveFilter('vehicle')}
        >
          Vehicles
        </button>
        <button 
          className={activeFilter === 'human' ? 'active' : ''}
          onClick={() => setActiveFilter('human')}
        >
          Human
        </button>
      </div>
      <div className="alerts-list">
        {filteredAlerts.map(alert => (
          <div 
            key={alert.id} 
            className={`alert-item ${alert.type} ${alert.status}`}
            onClick={() => setSelectedAlert(alert)}
          >
            <span className="alert-type">{alert.type.toUpperCase()}</span>
            <span className="alert-status">{alert.status.toUpperCase()}</span>
            <span className="alert-time">{alert.time}</span>
            <div className="alert-location">{alert.location}</div>
            <div className="alert-confidence">Confidence: {alert.confidence}</div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AlertsSidebar;
