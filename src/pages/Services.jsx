import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServices } from '../api/serviceApi';
import { BookingContext } from '../context/BookingContext';
import ServiceCard from '../components/ServiceCard';
import SkeletonCard from '../components/SkeletonCard';

const Services = () => {
  const [services, setServices] = useState([]);
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

  return (
    <div className="page-container">
      <h2>Select Your Mechanical Package</h2>
      
      {loading ? (
        <div className="services-grid">
          {[1, 2, 3].map(n => <SkeletonCard key={n} />)}
        </div>
      ) : (
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelect={selectService}
              isSelected={bookingState.selectedService?.id === service.id}
            />
          ))}
        </div>
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