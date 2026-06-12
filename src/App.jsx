import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <BrowserRouter>
          <div className="app-shell">
            <Navbar />
            <main className="main-content">
              <AppRoutes />
            </main>
          </div>
        </BrowserRouter>
      </BookingProvider>
    </ErrorBoundary>
  );
}

export default App;