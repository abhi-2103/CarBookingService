import React, { createContext, useReducer, useEffect } from 'react';

export const BookingContext = createContext();

const initialState = {
  user: null, // Tracks authenticated login session
  selectedService: null,
  customerDetails: null,
  bookingStatus: 'IDLE', 
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT_USER':
      return { ...state, user: null, selectedService: null, customerDetails: null, bookingStatus: 'IDLE' };
    case 'SELECT_SERVICE':
      return { ...state, selectedService: action.payload };
    case 'SAVE_DETAILS':
      return { ...state, customerDetails: action.payload };
    case 'SET_STATUS':
      return { ...state, bookingStatus: action.payload };
    case 'RESET_BOOKING':
      return { ...state, selectedService: null, customerDetails: null, bookingStatus: 'IDLE' };
    default:
      return state;
  }
}

export const BookingProvider = ({ children }) => {
  const [bookingState, dispatch] = useReducer(bookingReducer, initialState, () => {
    const localData = sessionStorage.getItem('car_booking_state');
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem('car_booking_state', JSON.stringify(bookingState));
  }, [bookingState]);

  const login = (userData) => dispatch({ type: 'LOGIN_USER', payload: userData });
  const logout = () => {
    sessionStorage.removeItem('car_booking_state');
    sessionStorage.removeItem('cached_form_draft');
    dispatch({ type: 'LOGOUT_USER' });
  };
  const selectService = (service) => dispatch({ type: 'SELECT_SERVICE', payload: service });
  const updateCustomerDetails = (details) => dispatch({ type: 'SAVE_DETAILS', payload: details });
  const setBookingStatus = (status) => dispatch({ type: 'SET_STATUS', payload: status });
  const resetBooking = () => dispatch({ type: 'RESET_BOOKING' });

  return (
    <BookingContext.Provider value={{ bookingState, login, logout, selectService, updateCustomerDetails, setBookingStatus, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};