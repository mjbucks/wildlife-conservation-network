import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapView.css';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ nodes = [] }) {
  const defaultCenter = [-1.2921, 36.8219];
  const defaultZoom = 13;

  const getStatusColor = (status) => {
    const colors = {
      active: '#4CAF50',
      inactive: '#FFC107',
      warning: '#FF9800',
      error: '#F44336'
    };
    return colors[status?.toLowerCase()] || '#757575';
  };

  const customIcon = (status) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${getStatusColor(status)};" class="marker-pin"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {nodes.map(node => (
          <Marker
            key={node._id}
            position={[
              node.coordinates?.latitude || 0,
              node.coordinates?.longitude || 0
            ]}
            icon={customIcon(node.status)}
          >
            <Popup>
              <div className="node-popup">
                <h3>Node {node.nodeId}</h3>
                <p><strong>Status:</strong> <span className={`status-${node.status?.toLowerCase()}`}>{node.status}</span></p>
                <p><strong>Battery:</strong> {node.batteryLevel}%</p>
                <p><strong>Last Heartbeat:</strong> {new Date(node.lastHeartbeat).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
