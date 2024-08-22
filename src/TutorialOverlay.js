import React, { useState, useEffect } from 'react';
import './TutorialOverlay.css'; // Ensure this path is correct

const TutorialOverlay = ({ onClose }) => {
    const [currentCard, setCurrentCard] = useState(1);

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

    const nextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const prevCard = () => {
        setCurrentCard(currentCard - 1);
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('overlay-tutorial-card')) {
            onClose();
        }
    };

    return (
        <div className="overlay-tutorial-card" onClick={handleOverlayClick}>
            {/* Arrows positioned outside of the content card, so they are free on the screen */}
            {currentCard === 1 && <div className="screen-arrow arrow-top-left"></div>}
            {currentCard === 2 && <div className="screen-arrow arrow-top-right"></div>}
            {currentCard === 3 && <div className="screen-arrow arrow-bottom-left"></div>}
            {currentCard === 4 && <div className="screen-arrow arrow-bottom-right"></div>}
            
            <div className="overlay-tutorial-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>

                {currentCard === 1 && (
                    <div>
                        <h2>Tutorial Step 1</h2>
                        <p>This is the first step of the tutorial. The arrow points to the top left corner.</p>
                    </div>
                )}
                {currentCard === 2 && (
                    <div>
                        <h2>Tutorial Step 2</h2>
                        <p>This is the second step of the tutorial. The arrow points to the top right corner.</p>
                    </div>
                )}
                {currentCard === 3 && (
                    <div>
                        <h2>Tutorial Step 3</h2>
                        <p>This is the third step of the tutorial. The arrow points to the bottom left corner.</p>
                    </div>
                )}
                {currentCard === 4 && (
                    <div>
                        <h2>Tutorial Step 4</h2>
                        <p>This is the final step of the tutorial. The arrow points to the bottom right corner.</p>
                    </div>
                )}

                <div className="navigation-buttons">
                    <button
                        className="navigation-button"
                        onClick={prevCard}
                        disabled={currentCard === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="navigation-button"
                        onClick={nextCard}
                        disabled={currentCard === 4}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialOverlay;
