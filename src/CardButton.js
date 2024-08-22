import React from 'react';
import './CardButton.css';

const CardButton = ({ color, icon, title, description, onClick }) => {
    return (
        <div className="card-button" style={{ borderColor: color }} onClick={onClick}>
            <div className="card-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};

export default CardButton;
