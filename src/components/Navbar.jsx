import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

const Navbar = () => {
  const { bookingState, logout } = useContext(BookingContext);
  const navigate = useNavigate();
  
  const isDraftStarted = !!bookingState.selectedService;
  const currentUser = bookingState.user;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🚗 AutoCare Pro</Link>
      </div>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active-link' : ''}>
          Home
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => isActive ? 'active-link' : ''}>
          Services / Book Appointment
        </NavLink>
        
        {/* Dynamic Context Auth Actions Container Node */}
        {currentUser ? (
          <button 
            onClick={() => { logout(); navigate('/'); }} 
            className="btn-secondary" 
            style={{ marginLeft: '1rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Sign Out ({currentUser.name})
          </button>
        ) : (
          <Link 
            to="/login" 
            style={{ marginLeft: '1rem', textDecoration: 'none', fontWeight: '600', color: 'var(--primary)' }}
          >
            Sign In
          </Link>
        )}
      </div>

      <div className="nav-status">
        {isDraftStarted ? (
          <span className="badge badge-warning">Draft Selected</span>
        ) : (
          <span className="badge badge-success">System Operational</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;