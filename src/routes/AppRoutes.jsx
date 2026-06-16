import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Booking from '../pages/Booking';
import AppointmentForm from '../components/AppointmentForm';
import Confirmation from '../pages/Confirmation';
import Login from '../pages/Login';

const RouteGuard = ({ children, ruleType }) => {
  const { bookingState } = useContext(BookingContext);
  const location = useLocation();

  // 🔐 Guard Rule 1: Must be authenticated to enter booking workflows
  if (!bookingState.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🛡️ Guard Rule 2: Validation check for workflow steps
  if (ruleType === 'NEEDS_SERVICE' && !bookingState.selectedService) {
    return <Navigate to="/services" replace />;
  }
  if (ruleType === 'NEEDS_FORM' && (!bookingState.selectedService || !bookingState.customerDetails)) {
    return <Navigate to="/booking/form" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      
      <Route 
        path="/booking" 
        element={
          <RouteGuard ruleType="NEEDS_SERVICE">
            <Booking />
          </RouteGuard>
        }
      >
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;