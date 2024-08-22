
import React, { useState, useEffect } from 'react';
import './MenuCard.css'; 
import harvardLogo from './harvard.png'; 
import CustomizeBotOverlay from './CustomizeBotOverlay';
import MenuButton from './MenuButton';
import StatusOverlay from './StatusOverlay';
import TutorialOverlay from './TutorialOverlay';  // Import the TutorialOverlay component
import axios from 'axios';
import AdminControlsOverlay from './AdminControlsOverlay'; // Ensure the path is correct


function MenuCard({ openOverlay, openPrivacyOverlay }) {
    const [status, setStatus] = useState('Disconnected');
    const [showCustomizeOverlay, setShowCustomizeOverlay] = useState(false);
    const [showStatusOverlay, setShowStatusOverlay] = useState(false);
    const [showTutorialOverlay, setShowTutorialOverlay] = useState(false); // State for the tutorial overlay
    const [currentAssistant, setCurrentAssistant] = useState('am104');  // Track the current assistant

    useEffect(() => {
        const originalConsoleLog = console.log;
        console.log = function (message) {
            originalConsoleLog.apply(console, arguments);
            if (message === 'Connected to server') {
                setStatus('Connected');
            } else if (message === 'Disconnected from server') {
                setStatus('Disconnected');
            }
        };
        return () => {
            console.log = originalConsoleLog;
        };
    }, []);

    const openCustomizeOverlay = () => {
        setShowCustomizeOverlay(true);
    };

    const closeCustomizeOverlay = () => {
        setShowCustomizeOverlay(false);
    };

    const openStatusOverlay = () => {
        setShowStatusOverlay(true);
    };

    const closeStatusOverlay = () => {
        setShowStatusOverlay(false);
    };

    const openTutorialOverlay = () => {
        setShowTutorialOverlay(true);
    };

    const closeTutorialOverlay = () => {
        setShowTutorialOverlay(false);
    };

    const [showAdminControlsOverlay, setShowAdminControlsOverlay] = useState(false);

    const openAdminControlsOverlay = () => {
        setShowAdminControlsOverlay(true);
    };

    const closeAdminControlsOverlay = () => {
        setShowAdminControlsOverlay(false);
};
    const switchAssistant = async (assistantName) => {
        try {
            const response = await axios.post('http://0.0.0.0:8080/switch_assistant', {
                assistant_name: assistantName
            });
            if (response.data.status === 'success') {
                setCurrentAssistant(assistantName);
                console.log(`Switched to ${assistantName}`);
            } else {
                console.error('Failed to switch assistant:', response.data.message);
            }
        } catch (error) {
            console.error('Error switching assistant:', error);
        }
    };

    return (
        <div className="menu-card">
            <div className="logo-placeholder">
                <img src={harvardLogo} alt="Harvard Logo" />
            </div>
            <h2 className="centered">Version 0.3.1, Aug 16</h2>
            <div className="horizontal-bar"></div>
            <h3 className="centered">Known Bugs </h3>
            <h4 className="centered">No thread capabilities</h4>
            <h4 className="centered">Laggy after 4 entries (use reset button)</h4>
            <div className="horizontal-bar"></div>
           
            <div className="tab-content">
                <MenuButton 
                    color="#3B82F6" 
                    icon="🔧" 
                    title="Interactive Functions" 
                    onClick={openCustomizeOverlay} 
                />
                <MenuButton 
                    color="#EF4444" 
                    icon="🔒" 
                    title="Privacy Policy" 
                    onClick={openPrivacyOverlay} 
                />
                <MenuButton 
                    color="#F59E0B" 
                    icon="⚙️" 
                    title="Switch to AM104 Assistant" 
                    onClick={() => switchAssistant('am104')} 
                />
                <MenuButton 
                    color="#F59E0B" 
                    icon="⚙️" 
                    title="Switch to Assistant 2" 
                    onClick={() => switchAssistant('phy15b')} 
                />
                <MenuButton
                    color="#34D399"
                    icon="❓"
                    title="Show Tutorial"
                    onClick={openTutorialOverlay} // Button to open the tutorial overlay
                />
                <MenuButton
                color="#D97706"
                icon="🛠️"
                title="Admin Controls"
                onClick={openAdminControlsOverlay}
            />
            </div>

            <div className="horizontal-bar"></div>

            <div 
                className={`status-box ${status === 'Connected' ? 'connected' : 'disconnected'}`} 
                onClick={openStatusOverlay}
            >
                Status: {status}
            </div>

            {showCustomizeOverlay && <CustomizeBotOverlay onClose={closeCustomizeOverlay} />}
            {showStatusOverlay && <StatusOverlay onClose={closeStatusOverlay} />}
            {showTutorialOverlay && <TutorialOverlay onClose={closeTutorialOverlay} />} {/* Render the TutorialOverlay */}
            {showAdminControlsOverlay && <AdminControlsOverlay onClose={closeAdminControlsOverlay} />}

        
        </div>
    );
}

export default MenuCard;
