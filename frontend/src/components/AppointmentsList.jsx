import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';
import '../App.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  // Fetch appointments when the component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/appointments');
      if (response.data && Array.isArray(response.data.appointments)) {
        setAppointments(response.data.appointments);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/appointments/${id}`);
      fetchAppointments(); // Refresh the list after deletion
    } catch (error) {
      setError('Error deleting appointment');
      console.error('Error deleting appointment:', error)
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormVisible(true);
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
    setEditingAppointment(null); // Reset editing state
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div>Error loading appointments: {error}</div>;
  }

  return (
    <div className="appointments-list">
      <h1>Appointments List</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointment_id || appointment.id }>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.appointment_time}</td>
              <td>{appointment.patient_id}</td>
              <td>
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment.appointment_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-appointment-button" onClick={toggleForm}>
        {formVisible ? 'Cancel' : 'Add Appointment'}
      </button>
      {formVisible && (
        <AppointmentForm
          onClose={toggleForm}
          onAppointmentAdded={fetchAppointments}
          editingAppointment={editingAppointment}
        /> 
      )}
    </div>
  );
};

export default AppointmentList;
