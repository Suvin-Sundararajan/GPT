import React from 'react';
import './VisualCard.css';

const VisualCard = () => {
  return (
    <div className="visual-card">
      <div className="content">
        {/* Placeholder content for scrolling test */}
        <div style={{ height: '1500px', background: 'linear-gradient(to bottom, #ffffff, #cccccc)' }}>
          <p>Scroll to see more content...</p>
        </div>
      </div>
    </div>
  );
}

export default VisualCard;
