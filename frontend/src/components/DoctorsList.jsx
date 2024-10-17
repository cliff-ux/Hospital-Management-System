import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorForm from './DoctorForm';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDoctors();
    }, []);

   const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/doctors');
        
            if (response.data && Array.isArray(response.data.doctors)) {
                setDoctors(response.data.doctors); // Ensure it's an array
            } else {
                // throw new Error('Unexpected data format');
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
        return <div>Error loading doctors: {error}</div>; // Error state
    }

    return (
        <div>
            <h1>Doctors</h1>
            <button onClick={toggleForm}>{formVisible ? 'Cancel' : 'Add Doctor'}</button>
            {formVisible && <DoctorForm onClose={toggleForm} onDoctorAdded={fetchDoctors} />}
            <ul>

                {doctors.length > 0 ? (
                  doctors.map(doctor => (
                    <li key={doctor.id}>{doctor.name} - {doctor.speciality}</li>
                ))
              ) : (
                <li>No doctors found.</li>
              )}
            </ul>
        </div>
    );
};

export default DoctorList;
