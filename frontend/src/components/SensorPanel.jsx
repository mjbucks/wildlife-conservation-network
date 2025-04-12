import React from 'react';
import '../styles/SensorPanel.css';

function SensorPanel() {
  const nodes = [
    {
      nodeId: 'NODE001',
      status: 'active',
      batteryLevel: 85,
      location: 'North Ridge',
      lastHeartbeat: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      signalStrength: 92
    },
    {
      nodeId: 'NODE002',
      status: 'warning',
      batteryLevel: 15,
      location: 'East Valley',
      lastHeartbeat: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
      signalStrength: 75
    },
    {
      nodeId: 'NODE003',
      status: 'active',
      location: 'West Forest',
      batteryLevel: 92,
      lastHeartbeat: new Date(Date.now() - 1000 * 60 * 2), // 2 mins ago
      signalStrength: 88
    },
    {
      nodeId: 'NODE004',
      status: 'active',
      location: 'South Gate',
      batteryLevel: 78,
      lastHeartbeat: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
      signalStrength: 85
    }
  ];

  // Calculate network overview stats - now correctly counting active nodes
  const activeNodes = nodes.filter(node => node.status === 'active').length;
  const averageBattery = Math.round(
    nodes.reduce((acc, node) => acc + node.batteryLevel, 0) / nodes.length
  );

  return (
    <div className="sensor-panel">
      <h2>Sensor Nodes</h2>
      
      <div className="network-overview">
        <div className="stat-box">
          <h3>Active Nodes</h3>
          <p>{activeNodes} / {nodes.length}</p>
        </div>
        <div className="stat-box">
          <h3>Battery Average</h3>
          <p>{averageBattery}%</p>
        </div>
      </div>

      <div className="sensor-nodes">
        {nodes.map(node => (
          <div 
            key={node.nodeId}
            className={`sensor-node ${node.status}`}
          >
            <div className="node-info">
              <h4>{node.location}</h4>
              <p className="node-id">ID: {node.nodeId}</p>
              <p className="battery-level">
                Battery: {node.batteryLevel}%
              </p>
              <p className="last-seen">
                Last Seen: {formatTimeDifference(node.lastHeartbeat)}
              </p>
              <p className="signal-strength">
                Signal: {node.signalStrength}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button className="primary-button">Check Node Status</button>
        <button className="primary-button">Alert Zones</button>
        <button className="primary-button">Download Report</button>
      </div>
    </div>
  );
}

function formatTimeDifference(date) {
  const diff = Date.now() - date;
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else {
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }
}

export default SensorPanel;