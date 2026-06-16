import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../api/serviceApi';
import { BookingContext } from '../context/BookingContext';
import ServiceCard from '../components/ServiceCard';
import SkeletonCard from '../components/SkeletonCard';

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search bar state controller
  const [loading, setLoading] = useState(true);
  const { bookingState, selectService } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices()
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔍 Real-Time Derived Filtering from API Array
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Select Your Mechanical Package</h2>
        
        {/* Dynamic Controlled Search input */}
        <div className="search-wrapper" style={{ width: '100%', maxWidth: '350px' }}>
          <input
            type="text"
            placeholder="🔍 Search diagnostic packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              boxSizing: 'border-box',
              fontSize: '0.95rem'
            }}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="services-grid">
          {[1, 2, 3].map(n => <SkeletonCard key={n} />)}
        </div>
      ) : (
        <>
          {filteredServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
              <p style={{ fontSize: '1.2rem', margin: 0 }}>No matching automotive packages found for "{searchTerm}"</p>
            </div>
          ) : (
            <div className="services-grid">
              {filteredServices.map(service => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={selectService}
                  isSelected={bookingState.selectedService?.id === service.id}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="footer-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
        <button 
          className="btn-primary" 
          disabled={!bookingState.selectedService}
          onClick={() => navigate('/booking/form')}
        >
          Next: Enter Details →
        </button>
      </div>
    </div>
  );
};

export default Services;