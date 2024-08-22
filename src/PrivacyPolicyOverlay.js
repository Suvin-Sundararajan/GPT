import React from 'react';
import './PrivacyPolicyOverlay.css'; // Ensure this path is correct

const PrivacyPolicyOverlay = ({ onClose }) => {
    return (
        <div className="overlay-card">
            <div className="overlay-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Privacy Policy</h2>
                <p>This is a tutor bot for students at Harvard. The bot is classified as L3 protected and follows strict privacy protocols. For more details, please refer to the <a href="https://policy.security.harvard.edu/level-3" target="_blank" rel="noopener noreferrer">Harvard Level 3 Data Policy</a>.</p>
                <ul>
                    <li>We do NOT collect user input but do aggregate and store user output queries.</li>
                    <li>All other data, settings, response rates, etc., are used only for analyzing bot effectiveness and cannot be traced back to the user.</li>
                </ul>
                <h3>AI Usage and Guidance</h3>
                <p>For more information on AI usage and ethical considerations, please refer to the <a href="https://oue.fas.harvard.edu/ai-guidance" target="_blank" rel="noopener noreferrer">Harvard AI Guidance</a>.</p>
                <h3>Disclaimers</h3>
                <ul>
                    <li>The information provided by the bot is for educational purposes only and should not be taken as official academic advice.</li>
                    <li>The bot's responses are generated based on aggregated data and may not always reflect the most current information.</li>
                    <li>Users are encouraged to verify the information provided by the bot with official Harvard resources and faculty.</li>
                </ul>
                <h3>Additional Privacy Information</h3>
                <p>We are committed to protecting your privacy. The data collected is anonymized and used solely for the purpose of improving the service. We do not share this data with any third parties.</p>
                <ul>
                    <li>Data aggregation helps us understand common queries and improve the bot's responses.</li>
                    <li>User settings and preferences are stored locally and are not transmitted to our servers.</li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicyOverlay;
