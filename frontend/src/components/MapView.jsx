import React from 'react';
import '../styles/MapView.css';

const MapView = () => {
  return (
    <section className="map-container">
      <div className="map">
        {/* Map component will be integrated here */}
        <p>Map View</p>
      </div>
      <div className="map-controls">
        <button>Zoom In</button>
        <button>Zoom Out</button>
        <button>Center View</button>
      </div>
    </section>
  );
};

export default MapView; 