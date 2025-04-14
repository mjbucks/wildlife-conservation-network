import React from 'react';
import '../styles/MapView.css';

function MapView() {
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <img 
          src="/images/PPDS-logo-PNG.jpg" 
          alt="Map Placeholder" 
          className="map-placeholder-image"
        />
      </div>
      <div className="map-controls">
        <button>Zoom In</button>
        <button>Zoom Out</button>
        <button>Center View</button>
      </div>
    </div>
  );
}

export default MapView;
