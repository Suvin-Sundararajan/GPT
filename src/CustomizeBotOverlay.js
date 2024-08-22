import React, { useState, useEffect } from 'react';
import './CustomizeBotOverlay.css'; 
import CardContainer from './CardContainer';

const CustomizeBotOverlay = ({ onClose }) => {
    const [temperature, setTemperature] = useState(false);
    const [customPrompt, setCustomPrompt] = useState('');
    const [pdfs, setPdfs] = useState([]);
    const [grades, setGrades] = useState('');

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    // Handle click outside the card region
    const handleClickOutside = (event) => {
        if (event.target.classList.contains('overlay-card')) {
            onClose();
        }
    };

    const handlePdfUpload = (event) => {
        const uploadedFiles = Array.from(event.target.files);
        if (pdfs.length + uploadedFiles.length <= 5) {
            setPdfs([...pdfs, ...uploadedFiles]);
        } else {
            alert('You can upload up to 5 PDFs only.');
        }
    };

    const toggleTemperature = () => {
        setTemperature(!temperature);
    };

    return (
        <div className="overlay-card" onClick={handleClickOutside}>
            
            <div className="overlay-header">
                Customize Your Bot
                <button className="close-button" onClick={onClose}>X</button> {/* Close Button */}
            </div>
        
            <div className="overlay-body">
                <p>Customizing your bot allows you to tailor its responses to better suit your needs. Adjust settings to enhance your learning experience and interact more effectively with the bot.</p>
                
                <CardContainer /> {/* Render the card buttons */}
            </div>
        </div>
    );
};

export default CustomizeBotOverlay;
