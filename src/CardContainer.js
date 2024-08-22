import React from 'react';
import CardButton from './CardButton';
import cardsData from './cardsData';

const CardContainer = () => {
    const handleCardClick = (title) => {
        alert(`You clicked on ${title}`);
        // You can replace the alert with any other function to handle the click
    };

    return (
        <div className="card-container">
            {cardsData.map((item, index) => {
                if (item.type === 'header') {
                    return (
                        <h2 key={index} className="card-header">
                            {item.title}
                        </h2>
                    );
                } else if (item.type === 'card') {
                    return (
                        <CardButton
                            key={index}
                            color={item.color}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            onClick={() => handleCardClick(item.title)}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default CardContainer;
