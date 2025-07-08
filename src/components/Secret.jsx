import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Secret = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/me', {
        withCredentials: true,
      });

      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/logout', null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        window.alert("Logged out successfully!");
        navigate('/');
      } else {
        window.alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      window.alert("Logout failed due to server error.");
    }
  };

  if (loading) {
    return (<div>Loading...</div>);
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You need to log in to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Secret Page</h1>
      <p>You're in!</p>
      {user && <p>Hello, {user.username}!</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Secret;
