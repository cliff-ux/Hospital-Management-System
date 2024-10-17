import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PatientForm from './PatientForm';
import '../App.css'; // Add a separate CSS file for styles

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null); // For edit functionality

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/patients');
      if (response.data && Array.isArray(response.data.patients)) {
        setPatients(response.data.patients);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/patients/${patientId}`);
      fetchPatients();
    } catch (error) {
      setError("Error deleting patient");
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormVisible(true); // Show the form for editing
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setEditingPatient(null); // Reset editing state
  };

  if (loading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div>Error loading patients: {error}</div>;
  }

  return (
    <div className="patients-list">
      <h1>Patients List</h1>
      {formVisible && (
        <PatientForm
          onClose={toggleForm}
          onPatientAdded={fetchPatients}
          editingPatient={editingPatient} // Pass the editing patient to the form
        />
      )}
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.name}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.email}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
                <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-patient-button" onClick={toggleForm}>
        {formVisible ? 'Cancel' : 'Add Patient'}
      </button>
    </div>
  );
};

export default PatientsList;
