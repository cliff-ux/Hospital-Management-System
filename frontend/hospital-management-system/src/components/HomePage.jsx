import React, { useState } from 'react';

function HomePage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Updated logic for login authentication
    if (
      (email === 'abdi@hospital.com' && password === 'password123') || 
      (email === 'amos@hospital.com' && password === 'password123') || 
      (email === 'cliff@hospital.com' && password === 'password123') || 
      (email === 'mark@hospital.com' && password === 'password123')
    ) {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="homepage-container">
      {/* Title moved to the top */}
      <h1 className="system-title">Hospital Management System</h1>
      
      <h2 className="homepage-title">Welcome to Hospital Management System</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default HomePage;
