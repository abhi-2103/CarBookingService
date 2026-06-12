import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

const AppointmentForm = () => {
  const { bookingState, updateCustomerDetails } = useContext(BookingContext);
  const navigate = useNavigate();

  // --- 1. CONTROLLED FORM STATE SYSTEM ---
  const [formData, setFormData] = useState({
    customerName: bookingState.customerDetails?.customerName || '',
    email: bookingState.customerDetails?.email || '',
    vehicleNumber: bookingState.customerDetails?.vehicleNumber || '',
    appointmentDate: bookingState.customerDetails?.appointmentDate || '',
  });

  const [errors, setErrors] = useState({});

  // --- 2. UNCONTROLLED DOM NODE REFERENCE (useRef) ---
  const autoFocusFieldRef = useRef(null);

  // Auto-focuses the Name field on initial load using the raw DOM node reference
  useEffect(() => {
    if (autoFocusFieldRef.current) {
      autoFocusFieldRef.current.focus();
    }
  }, []);

  // --- 3. BROWSER STORAGE: AUTO-SAVE FORM DRAFTS ---
  useEffect(() => {
    sessionStorage.setItem('cached_form_draft', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let currentErrors = {};
    if (!formData.customerName.trim()) currentErrors.customerName = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      currentErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      currentErrors.email = "Invalid email format.";
    }

    if (!formData.vehicleNumber.trim()) currentErrors.vehicleNumber = "Vehicle number tag is required.";
    if (!formData.appointmentDate) currentErrors.appointmentDate = "Please choose an execution date.";

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateCustomerDetails(formData);
      navigate('/booking/confirm');
    }
  };

  return (
    <div className="appointment-form-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="appointment-form">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--dark-slate)' }}>
          Provide Specifications & Scheduling
        </h3>
        
        {/* Full Name Input Element */}
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Customer Name</label>
          <input
            type="text"
            name="customerName"
            ref={autoFocusFieldRef} // Uncontrolled element reference binding
            value={formData.customerName}
            onChange={handleChange}
            className={errors.customerName ? 'input-error' : ''}
            placeholder="John Doe"
          />
          {errors.customerName && <p className="error-text">{errors.customerName}</p>}
        </div>

        {/* Email Address Input Element */}
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="john@example.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Vehicle Registration Input Element */}
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Vehicle Registration Tag</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className={errors.vehicleNumber ? 'input-error' : ''}
            placeholder="e.g. DL01CA1234"
          />
          {errors.vehicleNumber && <p className="error-text">{errors.vehicleNumber}</p>}
        </div>

        {/* Date Selection Input Element */}
        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Target Execution Date</label>
          <input
            type="date"
            name="appointmentDate"
            min={new Date().toISOString().split('T')[0]} // Blocks out past dates automatically
            value={formData.appointmentDate}
            onChange={handleChange}
            className={errors.appointmentDate ? 'input-error' : ''}
          />
          {errors.appointmentDate && <p className="error-text">{errors.appointmentDate}</p>}
        </div>

        {/* Action Button Layout Group */}
        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button type="button" className="btn-secondary" onClick={() => navigate('/services')}>
            Back to Services
          </button>
          <button type="submit" className="btn-primary">
            Proceed to Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;