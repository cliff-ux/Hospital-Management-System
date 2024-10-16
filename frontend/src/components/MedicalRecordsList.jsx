import React, { useState } from 'react';

const MedicalRecordsList = () => {
  // Initial state for medical records list and the new record form
  const [medicalRecords, setMedicalRecords] = useState([
    { record_id: 1, patient_name: 'Allan Musau ', date_created: '2024-10-10', notes: 'General Checkup', diagnosis: 'Flu' },
    { record_id: 2, patient_name: 'Jane Wanjiku', date_created: '2024-10-11', notes: 'Headache', diagnosis: 'Migraine' },
  ]);

  // State for managing form inputs for new medical record
  const [newRecord, setNewRecord] = useState({
    patient_name: '',
    date_created: '',
    notes: '',
    diagnosis: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  // Handle form submission to add a new medical record
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new medical record to the list
    setMedicalRecords([...medicalRecords, { ...newRecord, record_id: medicalRecords.length + 1 }]);
    // Reset the form
    setNewRecord({
      patient_name: '',
      date_created: '',
      notes: '',
      diagnosis: ''
    });
  };

  // Function to delete a medical record
  const deleteRecord = (id) => {
    const updatedRecords = medicalRecords.filter(record => record.record_id !== id);
    setMedicalRecords(updatedRecords);
  };

  return (
    <div>
      <h2>Medical Records</h2>
      <ul>
        {medicalRecords.map((record) => (
          <li key={record.record_id}>
            <strong>Patient:</strong> {record.patient_name} <br />
            <strong>Date:</strong> {record.date_created} <br />
            <strong>Notes:</strong> {record.notes} <br />
            <strong>Diagnosis:</strong> {record.diagnosis} <br />
            <button onClick={() => deleteRecord(record.record_id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New Medical Record</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient's Name: </label>
          <input type="text" name="patient_name" value={newRecord.patient_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Date: </label>
          <input type="date" name="date_created" value={newRecord.date_created} onChange={handleChange} required />
        </div>
        <div>
          <label>Notes: </label>
          <input type="text" name="notes" value={newRecord.notes} onChange={handleChange} required />
        </div>
        <div>
          <label>Diagnosis: </label>
          <input type="text" name="diagnosis" value={newRecord.diagnosis} onChange={handleChange} required />
        </div>
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
};

export default MedicalRecordsList;