import React from 'react';
import { Outlet } from 'react-router-dom';

const Booking = () => {
  return (
    <div className="booking-layout-wrapper">
      <Outlet />
    </div>
  );
};

export default Booking;