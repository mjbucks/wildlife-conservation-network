import React from 'react';
import '../styles/SensorPanel.css';

function SensorPanel({ nodes, networkStats }) {
  const formatTime = (timestamp) => {
    if (!timestamp) return 'No data';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <div className="sensor-panel">
      <h2>Sensor Network</h2>
      
      <div className="network-health">
        <h3>Network Health</h3>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-label">Active Nodes</span>
            <span className="stat-value">{networkStats.activeNodes}/{networkStats.totalNodes}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Battery Average</span>
            <span className="stat-value">{networkStats.batteryAvg}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Coverage</span>
            <span className="stat-value">{networkStats.coverage}%</span>
          </div>
        </div>
      </div>

      <div className="sensor-nodes">
        <h3>Sensor Nodes</h3>
        {nodes.map(node => (
          <div key={node._id} className={`node-card ${node.status.toLowerCase()}`}>
            <div className="node-header">
              <span className="node-name">Node #{node.nodeId}</span>
              <span className={`node-status ${node.status.toLowerCase()}`}>
                {node.status}
              </span>
            </div>
            <div className="node-details">
              <p><strong>Battery:</strong> {node.batteryLevel}%</p>
              <p><strong>Last Heartbeat:</strong> {formatTime(node.lastHeartbeat)}</p>
              <p><strong>Coordinates:</strong> {node.coordinates.latitude.toFixed(4)}, {node.coordinates.longitude.toFixed(4)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SensorPanel;
