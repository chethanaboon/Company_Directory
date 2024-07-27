import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const response = await axios.get('http://localhost:8000/api/companies/');
    setCompanies(response.data);
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="company-list">
      <div>
        <h1>Company Directory</h1>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="company-grid">
        {filteredCompanies.map(company => (
          <Link to={`/company/${company.company_id}`} key={company.company_id} className="company-card">
            <h2>{company.name}</h2>
            <p><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;{company.address}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;