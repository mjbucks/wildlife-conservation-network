import React from 'react';
import '../styles/SensorPanel.css';

const SensorPanel = () => {
  return (
    <aside className="sensor-panel">
      <h2>Sensor Network</h2>
      
      {/* Network Overview */}
      <div className="network-status">
        <div className="status-card">
          <h3>Network Health</h3>
          <div className="status-grid">
            <div className="status-item">
              <span>Active Nodes</span>
              <span className="value">15/16</span>
            </div>
            <div className="status-item">
              <span>Battery Average</span>
              <span className="value">82%</span>
            </div>
            <div className="status-item">
              <span>Coverage</span>
              <span className="value">95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor List */}
      <div className="sensor-list">
        <h3>Sensor Nodes</h3>
        {/* Each node is clickable to show details */}
        <div className="sensor-node active">
          <div className="node-header">
            <span className="node-name">Node #12</span>
            <span className="node-status">Active</span>
          </div>
          <div className="node-details">
            <span>Battery: 85%</span>
            <span>Last Alert: 2m ago</span>
            <span>Signal: Strong</span>
          </div>
        </div>

        <div className="sensor-node warning">
          <div className="node-header">
            <span className="node-name">Node #8</span>
            <span className="node-status">Low Battery</span>
          </div>
          <div className="node-details">
            <span>Battery: 15%</span>
            <span>Last Alert: 15m ago</span>
            <span>Signal: Medium</span>
          </div>
        </div>

        <div className="sensor-node error">
          <div className="node-header">
            <span className="node-name">Node #3</span>
            <span className="node-status">Offline</span>
          </div>
          <div className="node-details">
            <span>Last Seen: 2h ago</span>
            <span>Signal: None</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="network-actions">
        <button>Run Diagnostics</button>
        <button>Configure Alerts</button>
        <button>Download Report</button>
      </div>
    </aside>
  );
};

export default SensorPanel;
