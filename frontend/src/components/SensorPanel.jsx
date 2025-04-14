import React from 'react';
import '../styles/SensorPanel.css';

const SensorPanel = () => {
  return (
    <aside className="sensor-panel">
      <h2>Sensor Details</h2>
      <div className="sensor-info">
        <h3>Node #12</h3>
        <p>Status: Active</p>
        <p>Battery: 85%</p>
        <p>Last Update: 5 mins ago</p>
      </div>
      <div className="sensor-actions">
        <button>View History</button>
        <button>Mute Alerts</button>
        <button>Report Issue</button>
      </div>
    </aside>
  );
};

export default SensorPanel;
