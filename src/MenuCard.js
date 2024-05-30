import React, { useState, useEffect } from 'react';
import './MenuCard.css'; // Ensure this path is correct
import harvardLogo from './harvard.png'; // Ensure this path is correct

function MenuCard() {
    const [status, setStatus] = useState('Disconnected');

    useEffect(() => {
        const originalConsoleLog = console.log;
        console.log = function (message) {
            originalConsoleLog.apply(console, arguments);
            if (message === 'Connected to server') {
                setStatus('Connected');
            }
        };
        return () => {
            console.log = originalConsoleLog;
        };
    }, []);

    return (
        <div className="menu-card">
            <div className="logo-placeholder">
                <img src={harvardLogo} alt="Harvard Logo" />
            </div>
            <div className={`status-box ${status === 'Connected' ? 'connected' : 'disconnected'}`}>
                Status: {status}
            </div>
            <div className="settings">
                <button>Settings 1</button>
                <button>Settings 2</button>
                <button>Settings 3</button>
            </div>
        </div>
    );
}

export default MenuCard;
