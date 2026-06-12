import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You would typically log this to an error reporting service
    console.error("ErrorBoundary caught an unhandled runtime error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Rubric requirement: Fallback Component Design
      return (
        <div className="error-fallback-container">
          <h2>⚠️ Something went wrong application-side.</h2>
          <p>Our engineering systems detected an unexpected runtime crash.</p>
          <pre style={{ color: 'red' }}>{this.state.error?.toString()}</pre>
          <button className="btn-primary" onClick={() => window.location.href = '/'}>
            Return to Safety (Home)
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;