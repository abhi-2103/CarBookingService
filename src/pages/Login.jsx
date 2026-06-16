import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

const Login = () => {
  const { login } = useContext(BookingContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Redirect users back to where they were trying to go, or default to Home
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form Validation Rules
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all authorization fields.');
      return;
    }

    // Mock validation check for demonstration
    if (credentials.email === "kulkaraniabhilash@gmail.com" && credentials.password === "password123") {
      login({ email: credentials.email, name: 'Premium Client Admin' });
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials. / password123');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '450px', margin: '4rem auto' }}>
      <form onSubmit={handleLoginSubmit} className="appointment-form">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>System Authentication</h2>
        <p style={{ fontSize: '0.875rem', color: '#64748b', textAlign: 'center', marginBottom: '1.5rem' }}>
          Use <strong>kulkaraniabhilash@gmail.com</strong> & <strong>password123</strong> to test.
        </p>

        {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid #fca5a5' }}>{error}</div>}

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={credentials.email} 
            onChange={handleChange} 
            placeholder="admin@autocare.com"
          />
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
          <input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>
          Sign In to Session
        </button>
      </form>
    </div>
  );
};

export default Login;
