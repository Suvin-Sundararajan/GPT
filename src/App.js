import React from 'react';
import ChatCard from './ChatCard'; // Ensure this path is correct
import MenuCard from './MenuCard'; // Ensure this path is correct
import './App.css';

function App() {
    return (
        <div className="App">
    
            <div className="main-content">
                <MenuCard />  
                <ChatCard />
            </div>
        </div>
    );
}

export default App;
