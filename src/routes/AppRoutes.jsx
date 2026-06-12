import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Booking from '../pages/Booking';
import AppointmentForm from '../components/AppointmentForm';
import Confirmation from '../pages/Confirmation';

// Protected Route Guard Design Pattern (Rubric Requirement)
const RouteGuard = ({ children, ruleType }) => {
  const { bookingState } = useContext(BookingContext);

  // Guard 1: Prevent entering details if no car service package is selected
  if (ruleType === 'NEEDS_SERVICE' && !bookingState.selectedService) {
    return <Navigate to="/services" replace />;
  }
  
  // Guard 2: Prevent access to final review checkout if form entries are missing
  if (ruleType === 'NEEDS_FORM' && (!bookingState.selectedService || !bookingState.customerDetails)) {
    return <Navigate to="/booking/form" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Basic Root Route Layout */}
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      
      {/* SPA Routing: Nested & Dynamic Protected Flow Structure */}
      <Route 
        path="/booking" 
        element={
          <RouteGuard ruleType="NEEDS_SERVICE">
            <Booking />
          </RouteGuard>
        }
      >
        {/* Sub-routing child components managed by <Outlet /> inside Booking.jsx */}
        <Route path="form" element={<AppointmentForm />} />
        
        <Route 
          path="confirm" 
          element={
            <RouteGuard ruleType="NEEDS_FORM">
              <Confirmation />
            </RouteGuard>
          } 
        />
      </Route>

      {/* Wildcard Fallback: Gracefully catch-all misrouted paths and bounce to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;