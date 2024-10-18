import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = ({ onClose, onAppointmentAdded, editingAppointment }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    if (editingAppointment) {
      setDate(editingAppointment.appointment_date);
      setTime(editingAppointment.appointment_time);
      setPatientId(editingAppointment.patient_id);
    }
  }, [editingAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response;
      if (editingAppointment) {
        response = await axios.patch(`http://127.0.0.1:5555/appointments/${editingAppointment.id || editingAppointment.appointment_id}`, {
          date,
          time,
          patient_id: patientId,
        });
      } else {
        response =await axios.post('http://127.0.0.1:5555/appointments', {
          date,
          time,
          patient_id: patientId,
        });
      }
      console.log('Response from adding/updating', response.data)
      onAppointmentAdded();
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Patient Id"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        required
      />
      <button type="submit">{editingAppointment ? 'Update Appointment' : 'Add Appointment'}</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AppointmentForm;
