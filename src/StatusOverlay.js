import React from 'react';
import './StatusOverlay.css';

const StatusOverlay = ({ onClose, status }) => {
    return (
        <div className="overlay-card" onClick={onClose}>
            <div className="overlay-header">
                Status Details
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <div className="overlay-body">
                <p>Your current status is: <strong>{status}</strong></p>
                <p>Here you can see detailed information about your connection status and take actions if necessary.</p>
            </div>
        </div>
    );
};

export default StatusOverlay;
