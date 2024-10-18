import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ onClose, onAppointmentAdded, editingAppointment }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState(''); // Add doctorId state

  useEffect(() => {
    if (editingAppointment) {
      setDate(editingAppointment.appointment_date);
      setTime(editingAppointment.appointment_time);
      setPatientId(editingAppointment.patient_id);
      setDoctorId(editingAppointment.doctor_id); // Pre-populate doctorId if editing
    } else {
      // Reset fields when not editing
      setDate('');
      setTime('');
      setPatientId('');
      setDoctorId(''); // Reset doctorId
    }
  }, [editingAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const payload = {
        appointment_date: date,
        appointment_time: time,
        patient_id: patientId,
        doctor_id: doctorId, // Include doctor_id in payload
      };

      if (editingAppointment && editingAppointment.id) {
        response = await axios.patch(`http://127.0.0.1:5555/appointments/${editingAppointment.id}`, payload);
      } else {
        console.error('Editing appointment not defined or does not have an id');
        return;
      }

      console.log('Response from adding/updating', response.data);
      onAppointmentAdded();
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <input type="text" placeholder="Patient Id" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
      <input type="text" placeholder="Doctor Id" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required /> {/* Add doctorId input */}
      <button type="submit">{editingAppointment ? 'Update Appointment' : 'Add Appointment'}</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AppointmentForm;
