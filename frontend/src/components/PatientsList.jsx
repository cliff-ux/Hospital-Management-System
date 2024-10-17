import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PatientsList = () => {
  const [patients, setPatients] = useState([])
  const [formVisible, setFormVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])
 const fetchPatients = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/patients');
            if (response.data && Array.isArray(response.data.patients)) {
                setPatients(response.data.patients); // Ensure it's an array
            } else {
                throw new Error('Unexpected data format');
            }
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const toggleForm = () => setFormVisible(!formVisible);

    if (loading) {
        return <div>Loading doctors...</div>; // Loading state
    }

    if (error) {
        return <div>Error loading patients: {error}</div>; // Error state
    }

  return (
    <div>
      <h1>Patients List</h1>
      <button onClick={toggleForm}>{formVisible? 'Cancel' : 'Add Patient'}</button>
      {formVisible && <PatientForm onClose={toggleForm} onPatientAdded={fetchPatients} />}
      <ul>
        {patients.map(patient => (
          <li key={patient.patient_id}>
            {patient.name} - {patient.date_of_birth}
            <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PatientsList