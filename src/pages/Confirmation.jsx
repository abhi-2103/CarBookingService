import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { submitBookingAPI } from '../api/serviceApi';

const Confirmation = () => {
  const { bookingState, setBookingStatus, resetBooking } = useContext(BookingContext);
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  // Feedback Form State Management
  const [rating, setRating] = useState(5); // Controlled State
  const commentRef = useRef(null);         // Uncontrolled Input Node Reference
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFinalize = async () => {
    setBookingStatus('SUBMITTING');
    try {
      const payload = {
        service: bookingState.selectedService,
        customer: bookingState.customerDetails
      };
      const response = await submitBookingAPI(payload);
      setApiResponse(response);
      setBookingStatus('SUCCESS');
    } catch {
      setBookingStatus('ERROR');
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const feedbackPayload = {
      scoreIndex: rating,
      textComment: commentRef.current?.value || ''
    };
    console.log("📝 Feedback review securely registered:", feedbackPayload);
    setFeedbackSubmitted(true);
  };

  // SUCCESS STATE (Renders the Receipt + Feedback form)
  if (bookingState.bookingStatus === 'SUCCESS') {
    return (
      <div className="page-container" style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#10b981' }}>🎉 Allocation Ticket Generated!</h2>
        
        <div className="receipt-box" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', margin: '2rem 0', textAlign: 'left', border: '1px solid #e2e8f0' }}>
          <p><strong>Booking ID:</strong> {apiResponse?.bookingId}</p>
          <p><strong>Owner Name:</strong> {bookingState.customerDetails?.customerName}</p>
          <p><strong>Assigned Vehicle:</strong> {bookingState.customerDetails?.vehicleNumber}</p>
          <p><strong>Package Tier:</strong> {bookingState.selectedService?.name}</p>
          <p><strong>Cost Total:</strong> ${bookingState.selectedService?.price}</p>
        </div>

        {/* Dynamic Experience Feedback Form Module */}
        <div className="feedback-section" style={{ background: '#fff', border: '2px dashed #cbd5e1', padding: '2rem', borderRadius: '16px', margin: '3rem 0', textAlign: 'left' }}>
          {!feedbackSubmitted ? (
            <form onSubmit={handleFeedbackSubmit}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0f172a' }}>Rate Your Booking Experience</h3>
              
              {/* Controlled State Form Elements */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Satisfaction Level:</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                  style={{ padding: '0.5rem', borderRadius: '6px', width: '100%', border: '1px solid #cbd5e1' }}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (Good)</option>
                  <option value={3}>⭐⭐⭐ (Average)</option>
                  <option value={2}>⭐⭐ (Poor)</option>
                  <option value={1}>⭐ (Terrible)</option>
                </select>
              </div>

              {/* Uncontrolled State Input Node (useRef Element) */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Additional Comments (Optional):</label>
                <textarea 
                  ref={commentRef}
                  placeholder="Tell us how we can improve our appointment scheduling wizard..."
                  rows={3}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Submit Review Details
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <p style={{ color: '#10b981', fontWeight: '600', fontSize: '1.1rem', margin: 0 }}>
                ✓ Thank you! Your feedback has been stored inside the system log.
              </p>
            </div>
          )}
        </div>

        <button className="btn-secondary" style={{ width: '100%', padding: '1rem' }} onClick={() => { resetBooking(); navigate('/'); }}>
          Return to Dashboard Home
        </button>
      </div>
    );
  }

  // REVIEW STATE (Before user confirms booking)
  return (
    <div className="page-container">
      <h2>Review Order Summary</h2>
      
      <div className="review-card" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: '0' }}>Selected Package</h3>
        <p>{bookingState.selectedService?.name} — <strong style={{ color: '#2563eb' }}>${bookingState.selectedService?.price}</strong></p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Customer Core Specifics</h3>
        <p>Name: {bookingState.customerDetails?.customerName}</p>
        <p>Email: {bookingState.customerDetails?.email}</p>
        <p>Vehicle Identification Tag: {bookingState.customerDetails?.vehicleNumber}</p>
        <p>Target Date: {bookingState.customerDetails?.appointmentDate}</p>
      </div>

      <div className="footer-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-secondary" disabled={bookingState.bookingStatus === 'SUBMITTING'} onClick={() => navigate('/booking/form')}>
          Back to Editing
        </button>
        <button className="btn-success" disabled={bookingState.bookingStatus === 'SUBMITTING'} onClick={handleFinalize}>
          {bookingState.bookingStatus === 'SUBMITTING' ? 'Processing Transaction...' : 'Confirm & Schedule'}
        </button>
      </div>
    </div>
  );
};

export default Confirmation;