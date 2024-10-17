import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ onClose, onAppointmentAdded }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [patientId, setPatientId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:5555/appointments', { date, time, patient_id: patientId });
        onAppointmentAdded();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
            <input type="number" placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
            <button type="submit">Add Appointment</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default AppointmentForm;
