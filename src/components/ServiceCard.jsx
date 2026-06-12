import React from 'react';

// Maps dynamic contextual images based on service IDs
const imageMap = {
  1: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/ce741d49-b79a-5734-9312-cd5c5354f894/cf498c95-f2c2-5e4f-8896-066e8d137960.jpg", // Oil change
  2: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=400", // Wheel alignment
  3: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=400", // Deep wash car detailing
};

const ServiceCard = ({ service, onSelect, isSelected }) => {
  return (
    <div className={`service-card ${isSelected ? 'selected' : ''}`}>
      <img 
        src={imageMap[service.id] || "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400"} 
        alt={service.name} 
        className="card-banner-img"
      />
      <div className="card-body">
        <div>
          <h3>{service.name}</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0' }}>
            ⏱️ Estimated Time: {service.duration}
          </p>
        </div>
        <p className="price">${service.price}</p>
        <button 
          type="button" 
          className={isSelected ? "btn-success" : "btn-primary"} 
          onClick={() => onSelect(service)}
        >
          {isSelected ? '✓ Selected' : 'Choose Package'}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;