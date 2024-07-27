import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import CompanyList from './../components/CompanyList';

// mock axios
jest.mock('axios');

// some mock data
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

    // Checks if the text 'Company Directory' and placeholder 'Search companies' are present
    expect(screen.getByText(/Company Directory/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search companies/i)).toBeInTheDocument();

    // verifies each company's name and address displayed
    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
        expect(screen.getByText(company.address)).toBeInTheDocument();
      });
    });
  });

  test('filters companies based on search term', async () => {
    renderWithRouter(<CompanyList />);

    // first check if all companies are displayed
    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.getByText(company.name)).toBeInTheDocument();
      });
    });

    // search with keywor "One"
    fireEvent.change(screen.getByPlaceholderText(/Search companies/i), {
      target: { value: 'One' },
    });

    // verifies that only 'Company One' is visible and 'Company Two' is not visible.
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

    // verifies that non existent company is not shown in the page
    await waitFor(() => {
      mockCompanies.forEach((company) => {
        expect(screen.queryByText(company.name)).not.toBeInTheDocument();
      });
    });
  });
});
