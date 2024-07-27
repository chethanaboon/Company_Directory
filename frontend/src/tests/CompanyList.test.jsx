import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import CompanyList from './../components/CompanyList';


jest.mock('axios');

const mockCompanies = [
  {
    company_id: 1,
    name: 'Company One',
    address: 'Address One',
    locations: [1, 2],
  },
  {
    company_id: 2,
    name: 'Company Two',
    address: 'Address Two',
    locations: [1],
  },
];

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CompanyList', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCompanies });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the CompanyList component', async () => {
    renderWithRouter(<CompanyList />);

    expect(screen.getByText(/Company Directory/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search companies/i)).toBeInTheDocument();

    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
        expect(screen.getByText(company.address)).toBeInTheDocument();
      });
    });
  });

  test('filters companies based on search term', async () => {
    renderWithRouter(<CompanyList />);

    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByPlaceholderText(/Search companies/i), {
      target: { value: 'One' },
    });

    await waitFor(() => {
      expect(screen.getByText('Company One')).toBeInTheDocument();
      expect(screen.queryByText('Company Two')).not.toBeInTheDocument();
    });
  });

  test('renders no companies when search term does not match', async () => {
    renderWithRouter(<CompanyList />);

    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
      });
    });

    fireEvent.change(screen.getByPlaceholderText(/Search companies/i), {
      target: { value: 'Nonexistent Company' },
    });

    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.queryByText(company.name)).not.toBeInTheDocument();
      });
    });
  });
});
