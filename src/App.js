import React, { useState, useEffect } from 'react';
import ChatCard from './ChatCard';
import MenuCard from './MenuCard';
import PrivacyPolicyOverlay from './PrivacyPolicyOverlay'; // Ensure this path is correct
import TutorialOverlay from './TutorialOverlay'; // Import the TutorialOverlay
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import InterfacePage from "./InterfacePage";
import './App.css';

function GPTPage({ openOverlay, openPrivacyOverlay }) {  // New component for GPTPage
    const [showTutorialOverlay, setShowTutorialOverlay] = useState(false); // State for tutorial overlay
    const [tutorialShown, setTutorialShown] = useState(false); // Track if the tutorial has been shown

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/GPT' && !tutorialShown) {
            setShowTutorialOverlay(true);
            setTutorialShown(true); // Ensure the tutorial only shows once per session
        }
    }, [location.pathname, tutorialShown]);

    const closeTutorialOverlay = () => setShowTutorialOverlay(false);

    return (
        <div className="main-content" style={{ marginTop: 0, paddingTop: 20 }}>
            <MenuCard openOverlay={openOverlay} openPrivacyOverlay={openPrivacyOverlay} />
            <ChatCard />
            {showTutorialOverlay && <TutorialOverlay onClose={closeTutorialOverlay} />} {/* Add tutorial overlay */}
        </div>
    );
}

function App() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPrivacyOverlay, setShowPrivacyOverlay] = useState(false); // State for privacy overlay

    const openOverlay = () => setShowOverlay(true);
    const closeOverlay = () => setShowOverlay(false);
    const openPrivacyOverlay = () => setShowPrivacyOverlay(true); // Function to open privacy overlay
    const closePrivacyOverlay = () => setShowPrivacyOverlay(false); // Function to close privacy overlay

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/profile" element={<InterfacePage />} />
                    <Route path="/GPT" element={
                        <GPTPage openOverlay={openOverlay} openPrivacyOverlay={openPrivacyOverlay} />
                    } />
                </Routes>
            </Router>
            {showPrivacyOverlay && <PrivacyPolicyOverlay onClose={closePrivacyOverlay} />} {/* Add privacy overlay */}
        </div>
    );
}

export default App;
