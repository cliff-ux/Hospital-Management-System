import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminList from './components/AdminList';
import PatientsList from './components/PatientsList';
import DoctorsList from './components/DoctorsList';
import AppointmentsList from './components/AppointmentsList';
import MedicalRecordsList from './components/MedicalRecordsList';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';  // Assuming you have a navbar

import './App.css'; // Import CSS

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <>
            {/* Show Navbar only when logged in */}
            <NavBar />

            {/* Routes for logged-in users */}
            <Routes>
              <Route path="/admins" element={<AdminList />} />
              <Route path="/patients" element={<PatientsList />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/appointments" element={<AppointmentsList />} />
              <Route path="/medical-records" element={<MedicalRecordsList />} />
              <Route path="*" element={<Navigate to="/admins" />} /> {/* Default route after login */}
            </Routes>
          </>
        ) : (
          /* If not logged in, show the HomePage with login form */
          <Routes>
            <Route path="/" element={<HomePage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
