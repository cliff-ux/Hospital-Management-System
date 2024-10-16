import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminList from './components/AdminList';
import PatientsList from './components/PatientsList';
import DoctorsList from './components/DoctorsList';
import MedicalRecordsList from './components/MedicalRecordsList';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar'; // Assuming you have a NavBar component

import './App.css'; // Import CSS
import AppointmentsList from './components/AppointmentsList';

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
            {/* Show NavBar when the user is logged in */}
            <NavBar />

            {/* Routes accessible after login */}
            <Routes>
              <Route path="/admins" element={<AdminList />} />
              <Route path="/patients" element={<PatientsList />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/appointments" element={<AppointmentsList />} />
              <Route path="/medical-records" element={<MedicalRecordsList />} />
              
              {/* Default route after login */}
              <Route path="*" element={<Navigate to="/admins" />} />
            </Routes>
          </>
        ) : (
          /* If not logged in, show the login page (HomePage) */
          <Routes>
            <Route path="/" element={<HomePage onLogin={handleLogin} />} />
            
            {/* Redirect all other routes to login */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
