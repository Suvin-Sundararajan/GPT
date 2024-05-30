import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://127.0.0.1:5000'); // Connects to the Flask server

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null); // Ref for the latest message

    useEffect(() => {
        socket.on('connect', () => console.log('Connected to server'));
        socket.on('final_response', data => {
            setLoading(false); // Stop the loading dots as soon as the first response is received
            const responseText = data.text_deltas.join(""); // Join without additional spaces
            setMessages(prev => {
                const newMessages = [...prev];
                if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'bot') {
                    newMessages[newMessages.length - 1].text = responseText;
                } else {
                    newMessages.push({ sender: 'bot', text: responseText });
                }
                return newMessages;
            });
        });

        return () => {
            socket.off('connect');
            socket.off('final_response');
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // Scrolls to the latest message
    }, [messages]); // Dependency array includes messages to trigger scrolling when they change

    const createNewThread = () => {
        socket.emit('create_thread');
    };

    const startRun = () => {
        socket.emit('start_run');
    };

    const addMessage = () => {
        if (input.trim()) {
            setLoading(true); // Show loading dots when a message is sent
            socket.emit('add_message', { message: input });
            setMessages(prev => [...prev, { sender: 'user', text: input }]);
            setInput(''); // Clear the input after sending
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addMessage();
        }
    };
    const renderTextWithFormatting = (text) => {
        // Split the text into parts for further processing
        let parts = text.split(/\n/); // Split by newline to manage changes per line
        return parts.map((line, index) => (
            <React.Fragment key={index}>
                {line.includes('###') // Check if the line includes the marker
                    ? <b style={{ fontSize: '1.2em' }}>{line.replace(/###/g, '')}</b> // Apply bold and larger font, remove the marker
                    : line} // Normal text if no marker
                {index < parts.length - 1 && <br />} // Add line breaks between lines except for the last line
            </React.Fragment>
        ));
    };
    
        return formattedText.flatMap((part, index) => (
            <React.Fragment key={index}>
                {typeof part === 'string' ? part.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                        {line}
                        {lineIndex !== part.split('\n').length - 1 && <br />}
                    </React.Fragment>
                )) : part}
            </React.Fragment>
        ));
    };

    return (
        <div className="App">
            <div className="chat-container">
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {renderTextWithFormatting(message.text)}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Invisible div at the end of messages */}
              
                    {loading && (
                        <div className="message loading">
                            <div className="loading-dots">
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                                <div className="loading-dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} /> {/* Invisible div at the end of messages */}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button onClick={addMessage}>Send Message</button>
                    <button onClick={createNewThread}>New Thread</button>
                    <button onClick={startRun}>Start Run</button>
                </div>
            </div>
        </div>
    );
}

export default App;
