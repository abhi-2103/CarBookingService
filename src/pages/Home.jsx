import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Premium Car Maintenance,<br />Simplified.</h1>
      <p>Book professional mechanical diagnostics, precision alignment, and detailing directly through our streamlined workflow dashboard.</p>
      
      <button className="btn-primary main-cta" onClick={() => navigate('/services')}>
        Start Live Booking Workflow →
      </button>

      {/* High-Resolution Grid Section */}
      <div className="hero-gallery">
        <img 
          src="https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/9eeda9e8-87b4-52ea-a379-06857788391f/e0768043-f16d-5667-a3cd-c51a212d68ac.jpg" 
          alt="Sports car detailing" 
          className="gallery-img"
        />
        <img 
          src="https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6e1f3fb5cf670d625d2bf07bbd693f3f760ad764342d58ee54d9f65ac83134ee34efcb4048cb70f722d9f301af6fbf8231" 
          alt="Mechanic working on engine" 
          className="gallery-img"
        />
        <img 
          src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=500" 
          alt="Wheel maintenance" 
          className="gallery-img"
        />
      </div>
    </div>
  );
};

export default Home;