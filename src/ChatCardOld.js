// import React, { useState, useEffect, useRef } from 'react';
// import { FaSyncAlt, FaPaperPlane, FaFilePdf } from 'react-icons/fa';
// import 'katex/dist/katex.min.css';
// import renderTextWithFormatting from './renderTextWithFormatting';
// import './ChatCard.css';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import { useNavigate } from 'react-router-dom';
// import { socket, SUGGESTED_QUESTIONS } from './ChatCardConfig';  // Import from ChatCardConfig
// import Plot from 'react-plotly.js';  // Import Plotly for visualization
// import referenceLinks from './referenceLinks'; // Adjust the path as needed

// localStorage.debug = 'socket.io-client:*';

// function ChatCard({ openOverlay, openPrivacyOverlay }) {
//   const [messages, setMessages] = useState([]);
//   const [citations, setCitations] = useState('');
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [visualizationData, setVisualizationData] = useState([]); 
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();
//   const [showCheckboxes, setShowCheckboxes] = useState(false);

//   const [suggestedQuestions, setSuggestedQuestions] = useState(SUGGESTED_QUESTIONS);

//   const handleQuestionClick = (question) => {
//     setInput(question);
//     setSuggestedQuestions([]);
//   };
  
//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//     if (e.target.value) {
//       setSuggestedQuestions([]);
//     } else {
//       setSuggestedQuestions(SUGGESTED_QUESTIONS);
//     }
//   };

//   const toggleCheckboxes = () => {
//     setShowCheckboxes(!showCheckboxes);
//   };

//   useEffect(() => {
//     const checkAuth = () => {
//       onAuthStateChanged(auth, (user) => {
//         if (!user) {
//           // user.getIdToken().then((token) => {
//             // console.log(`Token: ${token}`);  // Debugging line
//             // socket.auth = { token }; // Set token for socket connection
//             if (!socket.connected) {
//               socket.connect();
//             }
//             // socket.connect();
//           // });
//           // navigate('/'); // Redirect to the login page if not authenticated
//         } else {
//           user.getIdToken().then((token) => {
//             console.log(`Token: ${token}`);  // Debugging line
//             socket.auth = { token }; // Set token for socket connection
//             socket.connect();
//           });
//         }
//       });
//     };

  
//     checkAuth();
  
//     socket.on('connect', () => console.log('Connected to server'));
  
//     socket.on('final_response', (data) => {
//       setLoading(false);
//       let responseText = data.text_deltas.join('');
//       const threadId = data.thread_id;
//       const messageIndex = data.message_index;
  
//       if (data.citations) {
//           responseText += `\nReferences: ${data.citations}`;
//       }
  
//       setMessages((prev) => {
//           const newMessages = [...prev];
//           if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'bot') {
//               newMessages[newMessages.length - 1].text = processReferences(responseText);
//               newMessages[newMessages.length - 1].threadId = threadId;
//               newMessages[newMessages.length - 1].messageIndex = messageIndex;
//           } else {
//               newMessages.push({ sender: 'bot', text: processReferences(responseText), threadId, messageIndex });
//           }
//           return newMessages;
//       });
  
//       console.log('Tool Call Outputs:', data.tool_call_outputs);
  
//       if (data.tool_call_outputs) {
//           setVisualizationData((prev) => [...prev, { messageIndex, ...data.tool_call_outputs }]);
//       }
//     });
  
//     socket.on('citations', (data) => {
//       console.log({ 'Citations': data }); // Debugging line
//       setCitations(data.citations);
//     });
  
//     // Handle reconnection attempts
//     socket.on('reconnect_attempt', (attempt) => {
//       console.log(`Reconnect attempt ${attempt}`);
//     });
  
//     // Handle connection errors
//     socket.on('connect_error', (error) => {
//       console.error('Connection Error:', error);
//     });
  
//     socket.on('error', (error) => {
//       console.error('Socket.IO Error:', error);
//     });
  
//     // Handle successful reconnection
//     socket.on('reconnect', (attemptNumber) => {
//       console.log(`Reconnected successfully on attempt ${attemptNumber}`);
//     });
  
//     // Clean up socket event listeners on component unmount
//     return () => {
//       socket.off('connect');
//       socket.off('final_response');
//       socket.off('citations');
//       socket.off('reconnect_attempt');
//       socket.off('connect_error');
//       socket.off('reconnect');
//     };
//   }, [navigate]);

//   useEffect(() => {
//     const scrollToBottom = () => {
//       const scrollable = messagesEndRef.current;
//       if (scrollable) {
//         scrollable.scrollTop = scrollable.scrollHeight;
//       }
//     };
//     scrollToBottom();
//   }, [messages]);

//   const createNewThread = () => {
//     socket.emit('create_thread');
//     setMessages([]); // Clear messages on new thread creation
//     setVisualizationData([]); // Clear visualization data
//     setCitations(''); // Clear citations
//   };

//   const processReferences = (text) => {
//     const referencePattern = /(\[(\d+)\]\s*([^,\s]+))/g;
//     return text.replace(referencePattern, (match, p1, p2, p3) => {
//       if (referenceLinks[p3]) {
//         return `<a href="${referenceLinks[p3]}" target="_blank">${p1}</a>`;
//       }
//       return p1;
//     });
//   };

//   const addMessage = () => {
//     if (input.trim()) {
//       const newUserMessage = { sender: 'user', text: `User: ${input}` };
//       socket.emit('add_message', { message: input, token: localStorage.getItem('token') });
//       setMessages((prev) => [...prev, newUserMessage, { sender: 'loading' }]);
//       setInput(''); // Clear the input after sending
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       addMessage();
//     }
//   };

//   return (
//     <div className="chat-card-container">
//       <div className="chat-card-inner">
//         <div className="chat-card">
  
//           <div className="chat-card-header">
//             <h3 className="ghost-title">AM 104: Complex Analysis</h3>
//           </div>
//           <div className="chat-content">
//             <div className="chat-container">
  
//               <div className="messages" ref={messagesEndRef}>
//                 {messages.map((message, index) => (
//                   <div key={index} className={`message-container ${showCheckboxes ? 'with-checkbox' : ''}`}>
//                     {showCheckboxes && (
//                       <input type="checkbox" defaultChecked className="message-checkbox" />
//                     )}
  
//                     <div className={`message ${message.sender}`}>
//                       {message.sender === 'loading' ? (
//                         <div className="loading-dots"></div>
//                       ) : (
//                         <>
//                           {renderTextWithFormatting(message.text)}
//                           {message.sender === 'bot' && (
//                             <>
//                               {index === messages.length - 1 && citations && (
//                                 <div className="citations">
//                                   <br></br>
//                                   <p dangerouslySetInnerHTML={{ __html: processReferences(`References: ${citations}`) }} />
//                                 </div>
//                               )}
//                               <div className="message-meta">
//                                 Thread ID: {message.threadId}, Message Index: {message.messageIndex}
//                               </div>
//                             </>
//                           )}
//                         </>
//                       )}
//                     </div>
  
//                     {/* Visualization Box */}
//                     {visualizationData.some(v => v.messageIndex === message.messageIndex) && (
//                       <div className={`message-container ${showCheckboxes ? 'with-checkbox' : ''}`}>
//                         <div className={`message ${message.sender}`}>
//                           <h4>{visualizationData.find(v => v.messageIndex === message.messageIndex).name}</h4>
//                           <div className="visualization-content" style={{ width: '80%' }}>
//                             <Plot
//                               data={[
//                                 {
//                                   x: visualizationData.find(v => v.messageIndex === message.messageIndex).x,
//                                   y: visualizationData.find(v => v.messageIndex === message.messageIndex).y,
//                                   z: visualizationData.find(v => v.messageIndex === message.messageIndex).z,
//                                   type: visualizationData.find(v => v.messageIndex === message.messageIndex).type === "3D" ? 'surface' : 'contour',
//                                   colorscale: 'HSV',
//                                 },
//                               ]}
//                               layout={{
//                                 title: `Visualization`,
//                                 xaxis: { title: 'Re(z)' },
//                                 yaxis: { title: 'Im(z)' },
//                                 zaxis: { title: 'Angle (radians)', tickvals: [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI], ticktext: ['-π', '-π/2', '0', 'π/2', 'π'] },
//                                 autosize: true,
//                               }}
//                               useResizeHandler={true}
//                               style={{ width: '100%', height: '100%' }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
  
//               {suggestedQuestions.length > 0 && (
//                 <div className="suggested-questions">
//                   {suggestedQuestions.map((question, index) => (
//                     <div
//                       key={index}
//                       className="suggested-question"
//                       onClick={() => handleQuestionClick(question)}
//                     >
//                       {question}
//                     </div>
//                   ))}
//                 </div>
//               )}
  
//               <div className="input-container">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={handleInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Enter your message..."
//                   className="chat-input"
//                 />
//                 <button className="send" onClick={addMessage}>
//                   <FaPaperPlane />
//                 </button>
//                 <button className="refresh" onClick={createNewThread}>
//                   <FaSyncAlt className="icon" />
//                 </button>
//                 <button className={`pdf-button ${showCheckboxes ? 'active' : ''}`} onClick={toggleCheckboxes}>
//                   <FaFilePdf className="pdf-icon" />
//                 </button>
//               </div>
              
//               <p className="disclaimer-text">
//                 This ChatBot can make mistakes, so please verify information before using. See <a href="#" onClick={openPrivacyOverlay}>privacy and information policy</a>.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatCard;