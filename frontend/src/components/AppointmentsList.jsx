import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/appointments');
            if (response.data && Array.isArray(response.data.appointments)) {
                setAppointments(response.data.appointments); // Ensure it's an array
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
        return <div>Loading appointments...</div>; // Loading state
    }

    if (error) {
        return <div>Error loading appointments: {error}</div>; // Error state
    }

    return (
        <div>
            <h1>Appointments</h1>
            <button onClick={toggleForm}>{formVisible ? 'Cancel' : 'Add Appointment'}</button>
            {formVisible && <AppointmentForm onClose={toggleForm} onAppointmentAdded={fetchAppointments} />}
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>{appointment.date} - {appointment.time}</li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
