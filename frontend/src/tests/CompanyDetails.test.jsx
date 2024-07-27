import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import CompanyDetails from '../components/CompanyDetails';
import MapView from '../components/MapView';

// mock all necessary components
jest.mock('leaflet/dist/leaflet.css', () => ({}));
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
}));
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

// some mock data
const mockCompany = {
  company_id: 1,
  name: 'Test Company',
  address: 'Test Address',
  latitude: 0,
  longitude: 0,
  locations: [
    {
      location_id: 1,
      name: 'Location 1',
      address: 'Address 1',
      latitude: 1,
      longitude: 1,
      region: 'NA',
    },
    {
      location_id: 2,
      name: 'Location 2',
      address: 'Address 2',
      latitude: 2,
      longitude: 2,
      region: 'EMEA',
    },
  ],
};

// CompanyDetails Component Test
describe('CompanyDetails', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockCompany });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // verifies company name and address is displayed right,
    // checks for the presence of text element 'All Locations'.
    test('renders CompanyDetails component', async () => {
      render(
        <BrowserRouter>
          <CompanyDetails />
        </BrowserRouter>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Test Company')).toBeInTheDocument();
        expect(screen.getByText('Test Address')).toBeInTheDocument();
        expect(screen.getByText('All Locations')).toBeInTheDocument();
      });
    });
  });

// MapView Component Test
describe('MapView', () => {
    test('renders MapView component', () => {
      const mockGetDirections = jest.fn();
      const mockMapRef = { current: {} };
  
      render(
        <MapView
          center={[0, 0]}
          zoom={13}
          locations={mockCompany.locations}
          getDirections={mockGetDirections}
          mapRef={mockMapRef}
        />
      );
  
    //   verifies that the map and the tiles are rendered
    // also verifies if alllocations are found on the map
      expect(screen.getByTestId('map-container')).toBeInTheDocument();
      expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
      mockCompany.locations.forEach((location) => {
        expect(screen.getByText(location.name)).toBeInTheDocument();
      });
    });
  });