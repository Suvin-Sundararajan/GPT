import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaSyncAlt, FaPaperPlane, FaStop } from 'react-icons/fa';
import 'katex/dist/katex.min.css';
import renderTextWithFormatting from './renderTextWithFormatting'; // Ensure this path is correct
import './ChatCard.css'; // Create a separate CSS file for the ChatCard component

const socket = io('https://gptserverharvard.wl.r.appspot.com'); // Connects to the Flask server
// const socket = io('http://0.0.0.0:8080')

localStorage.debug = 'socket.io-client:*';

function ChatCard() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

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
        const scrollToBottom = () => {
            const scrollable = messagesEndRef.current;
            if (scrollable) {
                scrollable.scrollTop = scrollable.scrollHeight;
            }
        };
        if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
            scrollToBottom();
        }
        // Checking if the new message is added and if it's by the user or bot
        if (messages.length && (messages[messages.length - 1].sender === 'user' || messages[messages.length - 1].sender === 'bot')) {
            scrollToBottom();
        }
    }, [messages]); // Execute only when messages update
    // Dependency array includes messages to run effect when they update

    const createNewThread = () => {
        socket.emit('create_thread');
        setMessages([]); // Clear messages on new thread creation
    };

    const startRun = () => {
        socket.emit('start_run');
    };

     const addMessage = () => {
        if (input.trim()) {
            const newUserMessage = { sender: 'user', text: `User: ${input}` };
            socket.emit('add_message', { message: input });
            setMessages(prev => [...prev, newUserMessage, { sender: 'loading' }]);
            setInput(''); // Clear the input after sending
            setLoading(true); // Show loading dots when a message is sent
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            addMessage();
        }
    };
    return (
        <div className="chat-card">
            <div className="chat-container">
                <div className="messages" ref={messagesEndRef}>
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            {message.sender === 'loading' ? (
                                loading && (
                                    <div className="loading-dots">
                                        <div className="loading-dot"></div>
                                        <div className="loading-dot"></div>
                                        <div className="loading-dot"></div>
                                    </div>
                                )
                            ) : (
                                renderTextWithFormatting(message.text)
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="input-container">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="chat-input" // Add a class for styling
                    />
                    <button className="send" onClick={addMessage}>
                        <FaPaperPlane />
                    </button>
                    <button className="refresh" onClick={createNewThread}>
                        <FaSyncAlt className="icon" />
                    </button>
                    {/* <button className="start" onClick={startRun}>
                        <FaStop />
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default ChatCard;