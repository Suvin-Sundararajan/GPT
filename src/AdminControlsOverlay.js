import React, { useState } from 'react';
import './AdminControlsOverlay.css';
import axios from 'axios';

const AdminControlsOverlay = ({ onClose }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [courseName, setCourseName] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [courseSettings, setCourseSettings] = useState({});
    const [roles, setRoles] = useState('');
    const [limitations, setLimitations] = useState('');
    const [customInstructions, setCustomInstructions] = useState('');

    const nextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const prevCard = () => {
        setCurrentCard(currentCard - 1);
    };

    const handleSaveSettings = async () => {
        try {
            const response = await axios.post('http://localhost:8080/courses', {
                name: courseName,
                instructor: instructorName,
                setting: {
                    roles: roles,
                    limitations: limitations,
                    customInstructions: customInstructions,
                    ...courseSettings,
                }
            });
            alert('Course settings saved successfully!');
        } catch (error) {
            console.error('Failed to save course settings:', error);
            alert('Failed to save course settings.');
        }
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('overlay-admin-card')) {
            onClose();
        }
    };

    return (
        <div className="overlay-admin-card" onClick={handleOverlayClick}>
            <div className="overlay-admin-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>

                {currentCard === 1 && (
                    <div>
                        <h2>Admin Controls - Course Information</h2>
                        <input 
                            type="text" 
                            placeholder="Course Name" 
                            value={courseName} 
                            onChange={(e) => setCourseName(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Instructor Name" 
                            value={instructorName} 
                            onChange={(e) => setInstructorName(e.target.value)} 
                        />
                        <button className="save-button" onClick={handleSaveSettings}>
                            Save
                        </button>
                    </div>
                )}

                {currentCard === 2 && (
                    <div>
                        <h2>Admin Controls - Step 1</h2>
                        <div className="box-container">
                            <div className="box">
                                <h3>ChatBot Roles</h3>
                                <p>Define the roles that students can access. This can include different levels of permissions or different functionalities within the chatbot.</p>
                                <textarea 
                                    placeholder="Define roles here..." 
                                    style={{ width: '100%', height: '100px' }}
                                    value={roles}
                                    onChange={(e) => setRoles(e.target.value)}
                                />
                            </div>
                            <div className="box">
                                <h3>Limitations</h3>
                                <p>Specify the content filters and define where the chatbot should stop answering. This ensures that the chatbot adheres to the required guidelines.</p>
                                <textarea 
                                    placeholder="Set limitations here..." 
                                    style={{ width: '100%', height: '100px' }}
                                    value={limitations}
                                    onChange={(e) => setLimitations(e.target.value)}
                                />
                            </div>
                            <div className="box">
                                <h3>Custom Instructions</h3>
                                <p>Add any custom instructions that should be followed by the chatbot. These can be specific to certain scenarios or requirements.</p>
                                <textarea 
                                    placeholder="Type custom instructions here..." 
                                    style={{ width: '100%', height: '100px' }}
                                    value={customInstructions}
                                    onChange={(e) => setCustomInstructions(e.target.value)}
                                />
                            </div>
                        </div>
                        <button className="save-button" onClick={handleSaveSettings}>
                            Save
                        </button>
                    </div>
                )}

                {currentCard === 3 && (
                    <div>
                        <h2>Admin Controls - Step 2</h2>
                        <button className="save-button" onClick={handleSaveSettings}>
                            Save
                        </button>
                    </div>
                )}

                {currentCard === 4 && (
                    <div>
                        <h2>Admin Controls - Step 3</h2>
                        <div className="box">
                            <h3>Available Interactive Functions</h3>
                        </div>
                        <button className="custom-function-button">Create a Custom Function</button>
                        <button className="save-button" onClick={handleSaveSettings}>
                            Save
                        </button>
                    </div>
                )}

                <div className="navigation-buttons">
                    {currentCard > 1 && (
                        <button className="navigation-button" onClick={prevCard}>
                            Previous
                        </button>
                    )}
                    {currentCard < 4 && (
                        <button className="navigation-button" onClick={nextCard}>
                            Next
                        </button>
                    )}
                    {currentCard === 4 && (
                        <button className="navigation-button" onClick={handleSaveSettings}>
                            Save Settings
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminControlsOverlay;
