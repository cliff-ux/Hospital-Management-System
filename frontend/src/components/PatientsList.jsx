import React, { useState } from 'react';

const PatientsList = () => {
  // Initial state for patients list and the new patient form
  const [patients, setPatients] = useState([
    { patient_id: 1, name: 'John Mwangi', date_of_birth: '1990-05-20', address: '123 Street, Nairobi', contact_number: '+254701234567', email: 'john@example.com' },
    { patient_id: 2, name: 'Ali Ahmed', date_of_birth: '1985-10-15', address: '456 Avenue, Mombasa', contact_number: '+254712345678', email: 'ali@example.com' },
  ]);

  // State for managing form inputs
  const [newPatient, setNewPatient] = useState({
    name: '',
    date_of_birth: '',
    address: '',
    contact_number: '',
    email: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new patient to the list
    setPatients([...patients, { ...newPatient, patient_id: patients.length + 1 }]);
    // Reset the form
    setNewPatient({
      name: '',
      date_of_birth: '',
      address: '',
      contact_number: '',
      email: ''
    });
  };

  // Handle deleting a patient by filtering them out of the list
  const handleDelete = (patient_id) => {
    const updatedPatients = patients.filter(patient => patient.patient_id !== patient_id);
    setPatients(updatedPatients);
  };

  return (
    <div>
      <h2>Patients List</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.patient_id}>
            <strong>Name:</strong> {patient.name} <br />
            <strong>Date of Birth:</strong> {patient.date_of_birth} <br />
            <strong>Address:</strong> {patient.address} <br />
            <strong>Contact:</strong> {patient.contact_number} <br />
            <strong>Email:</strong> {patient.email} <br />
            {/* Delete Button */}
            <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Patient</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={newPatient.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth: </label>
          <input type="date" name="date_of_birth" value={newPatient.date_of_birth} onChange={handleChange} required />
        </div>
        <div>
          <label>Address: </label>
          <input type="text" name="address" value={newPatient.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact Number: </label>
          <input type="text" name="contact_number" value={newPatient.contact_number} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={newPatient.email} onChange={handleChange} required />
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default PatientsList;