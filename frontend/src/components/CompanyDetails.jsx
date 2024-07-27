import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

import MapView from './MapView';
import { regions } from '../utils/regions';
import { calculateDistance, getRegionFromCoordinates } from '../utils/geoUtils';


const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(13);
  const mapRef = useRef();
  const [filters, setFilters] = useState({
    searchTerm: '',
    region: '',
  });
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFindingClosest, setIsFindingClosest] = useState(false);

  useEffect(() => {
    fetchCompanyDetails();
  }, [id]);


  const fetchCompanyDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/companies/${id}/`);
      const companyData = response.data;

      const locationsWithRegion = await Promise.all(companyData.locations.map(async (location) => {
        const region = await getRegionFromCoordinates(location.latitude, location.longitude);
        return { ...location, region };
      }));

      setCompany({ ...companyData, locations: locationsWithRegion });
      setMapCenter([companyData.latitude, companyData.longitude]);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationClick = (lat, lng, location) => {
    setMapCenter([lat, lng]);
    setMapZoom(15);
    mapRef.current.flyTo([lat, lng], 15, {
      duration: 3
    });
    setSelectedLocation(location);
    const mapElement = document.querySelector('.map-container');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // add google map directions
  const getDirections = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredLocations = company?.locations.filter(location => {
    return (
      location.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      (filters.region === '' || location.region === filters.region)
    );
  });

  const findClosestLocation = () => {
    setIsFindingClosest(true);
    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          findClosest([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert("Please turn on your location");
          setIsFindingClosest(false);
        }
      );
    } else {
      findClosest(userLocation);
    }
  };

  const findClosest = (userLoc) => {
    const closest = company.locations.reduce((closest, location) => {
      const distance = calculateDistance(userLoc[0], userLoc[1], location.latitude, location.longitude);
      return distance < closest.distance ? { location, distance } : closest;
    }, { location: null, distance: Infinity });

    if (closest.location) {
      handleLocationClick(closest.location.latitude, closest.location.longitude, closest.location);
      alert(`Closest location: ${closest.location.name}`);
    }
    setIsFindingClosest(false);
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (!company) return <div>Company not found</div>;

  return (
    <div className="company-details">
      <div className="back-button">
        <Link to="/">Back to List</Link>
      </div>

      <h1>{company.name}</h1>
      <p>{company.address}</p>

      <MapView
        center={mapCenter}
        zoom={mapZoom}
        locations={company.locations}
        getDirections={getDirections}
        mapRef={mapRef}
      />

      <div className="locations-container">

        <div className="filters">
          <h2>All Locations</h2>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search locations by name"
            value={filters.searchTerm}
            onChange={handleFilterChange}
          />
          <select name="region" value={filters.region} onChange={handleFilterChange}>
            <option value="">All Business Regions</option>
            {Object.entries(regions).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
          {/* <button onClick={findClosestLocation}>Find Closest to Me</button> */}
          <button onClick={findClosestLocation} disabled={isFindingClosest}>
            {isFindingClosest ? 'Finding...' : 'Find Closest to Me'}
          </button>
        </div>

        <div className="locations-grid">
          {filteredLocations.map(location => (
            <div
              key={location.location_id}
              className={`location-card ${selectedLocation?.location_id === location.location_id ? 'selected' : ''}`}
              onClick={() => handleLocationClick(location.latitude, location.longitude, location)}
            >
              <h3>{location.name}</h3>
              <p>{location.address}</p>
              <p>{location.latitude} Lat | {location.longitude} Lon</p>
              <button onClick={(e) => {
                e.stopPropagation();
                getDirections(location.latitude, location.longitude);
              }}>
                Directions
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CompanyDetails;