import React from 'react';
import './MenuButton.css';

const MenuButton = ({ color, icon, title, onClick }) => {
    return (
        <div className="menu-button" style={{ borderColor: color }} onClick={onClick}>
            <div className="menu-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="menu-content">
                <h3 className="menu-title">{title}</h3>
            </div>
        </div>
    );
};

export default MenuButton;
