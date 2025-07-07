import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/auth/signup', {
        username,
        password
      });
      
      setMessage('Account created successfully!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Show the exact error message from backend
        setMessage(error.response.data.error);
      } else if (error.response && error.response.status === 400) {
        setMessage('Username and password are required');
      } else if (error.response && error.response.status === 409) {
        setMessage('Username already exists');
      } else if (error.response && error.response.status === 500) {
        setMessage('Internal server error');
      } else {
        setMessage('Signup failed');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username:</label>
          <input
            className="form-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password:</label>
          <input
            className="form-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="form-button" type="submit">
          Sign Up
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default SignUp;