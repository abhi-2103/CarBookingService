import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-title loading-shimmer"></div>
      <div className="skeleton-text loading-shimmer"></div>
      <div className="skeleton-button loading-shimmer"></div>
    </div>
  );
};

export default SkeletonCard;