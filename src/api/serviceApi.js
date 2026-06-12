
/**
 * Asynchronous Data Handling Layer
 * Simulates a real-world REST backend engine with artificial latency network delays.
 * Fulfills project requirements for asynchronous booking operations.
 */

// 1. Fetches available car service packages (Used in Services.jsx to trigger Skeleton Cards)
export const fetchServices = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate an HTTP 200 OK dynamic JSON payload array response
      resolve([
        { 
          id: 1, 
          name: 'Basic Periodic Oil Service', 
          price: 49, 
          duration: '1 Hour' 
        },
        { 
          id: 2, 
          name: 'Advanced Wheel Alignment & Balancing', 
          price: 89, 
          duration: '1.5 Hours' 
        },
        { 
          id: 3, 
          name: 'Complete Executive Deep Detailing', 
          price: 199, 
          duration: '4 Hours' 
        },
      ]);
    }, 1200); // 1.2-second artificial network latency delay
  });
};

// 2. Submits full customer & service booking dataset (Used in Confirmation.jsx)
export const submitBookingAPI = (bookingData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Payload securely dispatched to database architecture:", bookingData);
      
      // Simulate generating a unique backend database confirmation receipt ticket
      resolve({ 
        success: true, 
        bookingId: 'BK-' + Math.floor(100000 + Math.random() * 900000) 
      });
    }, 1500); // 1.5-second processing latency delay
  });
};