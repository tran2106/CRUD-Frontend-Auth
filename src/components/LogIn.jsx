import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [logInData, setLogInData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', logInData, {
        withCredentials: true
      });
      if (response.data.success) {
        alert('Login successful!');
        navigate('/secret');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.error || 'server error'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input name="username" value={logInData.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={logInData.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogIn;
