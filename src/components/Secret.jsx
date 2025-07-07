import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Secret = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/me');
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
    </div>
  );
};

export default Secret;
