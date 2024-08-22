// src/ChatCardConfig.js

// Use this file for common connection changes. 
import io from 'socket.io-client';
export const SUGGESTED_QUESTIONS = [
    'Give me an example problem',
    'Explain this topic:',
    'What are some common misconceptions'
  ];
  
  // Socket.IO client setup with reconnection settings

export const socket = io('http://0.0.0.0:8080', {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
    autoConnect: false  // The socket will only connect when explicitly told to do so
});
  