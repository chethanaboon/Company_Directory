import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const MapView = ({ center, zoom, locations, getDirections, mapRef }) => (
  <div className="map-container">
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }} ref={mapRef}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map(location => (
        <Marker key={location.location_id} position={[location.latitude, location.longitude]}>
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;{location.address}</p>
              <p>{location.latitude} Lat | {location.longitude} Long</p>
              <p>Region: {location.region}</p>
              <button onClick={() => getDirections(location.latitude, location.longitude)}>
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default MapView;