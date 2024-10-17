import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ onClose, onPatientAdded, editingPatient }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingPatient) {
      setName(editingPatient.name);
      setDateOfBirth(editingPatient.date_of_birth);
      setEmail(editingPatient.email);
    }
  }, [editingPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPatient) {
        await axios.put(`http://127.0.0.1:5555/patients/${editingPatient.patient_id}`, {
          name,
          date_of_birth: dateOfBirth,
          email,
        });
      } else {
        await axios.post('http://127.0.0.1:5555/patients', {
          name,
          date_of_birth: dateOfBirth,
          email,
        });
      }
      onPatientAdded();
      onClose();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{editingPatient ? 'Update Patient' : 'Add Patient'}</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default PatientForm;
