import React, { useState } from 'react';
import './css/Authentication.css';
import axios from 'axios';

export default function Authentication({ setToken, setLoginUsername }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [showSignInError, setShowSignInError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // const defaultBackendURL="http://localhost:5000";
  const renderBackendURL="https://harekrishna.onrender.com";
  // const renderBackendURL = "http://localhost:5000";

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${renderBackendURL}/signup`, { username, password });
      if (response.data.message === 'User created') {
        setIsSignUp(false);
        setPassword('');
        setUsername('');
        setSignUpSuccess(true);
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${renderBackendURL}/signin`, { username, password });
      if (response.data.message === 'Authentication successful') {
        setToken(response.data.token);
        setLoginUsername(username);
        setPassword('');
        setUsername('');
        setSignInError('');
        setShowSignInError(false);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setSignInError('Sign-in failed. Please check your credentials.');
      setShowSignInError(true);
      setTimeout(() => {
        setShowSignInError(false);
      }, 3000); // Hide the error message after 3 seconds
    }
  };

  return (
    <div className="Myauth">
      {isSignUp ? (
        <div className="auth-card" >
          <h2 className="auth-heading">Bookstore-Sign Up</h2>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="auth-button" onClick={handleSignUp}>Sign Up</button>
          {signUpSuccess && <p className="success-message">Sign-up successful! You can now sign in.</p>}
          <p className="auth-toggle">
            Already have an account? <button className="toggle-button" onClick={() => setIsSignUp(false)}>Sign In</button>
          </p>
        </div>
      ) : (
        <div className="auth-card">
          <h2 className="auth-heading">Bookstore-Sign In</h2>
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="auth-button" onClick={handleSignIn}>Sign In</button>
          {showSignInError && <p className="error-message">{signInError}</p>}
          <p className="auth-toggle">
            Don't have an account? <button className="toggle-button" onClick={() => setIsSignUp(true)}>Sign Up</button>
          </p>
        </div>
      )}
    </div>
  );
}