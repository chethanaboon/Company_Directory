import axios from 'axios';

import { determineRegion } from './regions'


export const calculateDistance = (lat1, lon1, lat2, lon2) => { // using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const getRegionFromCoordinates = async (lat, lon) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const country = response.data.address.country;
        return determineRegion(country);
    } catch (error) {
        console.error("Error in reverse geocoding:", error);
        return "Unknown";
    }
};