import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase'; // Ensure the path to your firebase configuration file is correct
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, get their ID token
          user.getIdToken().then((token) => {
            localStorage.setItem('token', token); // Store the token in localStorage

            // Instead of directly navigating to /GPT, call a backend API
            fetch('/api/validate-invite', {  // Assuming you have an endpoint to validate invite
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: user.email })  // Pass necessary data
            })
            .then(response => response.json())
            .then(data => {
              if (data.isValidInvite) {
                navigate('/GPT');  // Only navigate if the invite is valid
              } else {
                alert('Invalid invite code or access denied.');
                auth.signOut();  // Sign out the user if they aren't allowed
              }
            })
            .catch(error => console.error('Error validating invite:', error));
          });
        }
      });
    };

    checkAuth();
  }, [navigate]);

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error during sign-in:', error);
    });
  };

  return (
    <div className="landing-page">
      <header className="top-bar">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/profile">My Profile</a></li>
            <li><a href="/classes">Offered Classes</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </nav>
      </header>
      <div className="main-content">
        <div className="card">
          <div className="card-content">
            <div className="text-content">
              <img src="/images/harvard_logo.png" alt="Harvard Logo" className="logo" />
              <h1>Custom Chatbot for Harvard Courses</h1>
              <p>Trained with the latest course material.</p>
              <button onClick={handleSignIn}>Sign In with Google</button>
            </div>
            <div className="video-content">
              <video controls className="intro-video">
                <source src="/videos/chatbot_intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        © 2024 Physics Department. All rights reserved. This is beta access.
      </footer>
    </div>
  );
};

export default LandingPage;
