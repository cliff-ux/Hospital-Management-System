import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorForm from './DoctorForm';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctorToEdit, setDoctorToEdit] = useState(null); // New state for editing

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/doctors');
            if (response.data && Array.isArray(response.data.doctors)) {
                setDoctors(response.data.doctors);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = () => {
        setFormVisible(!formVisible);
        setDoctorToEdit(null); // Reset editing state when toggling
    };

    const handleEdit = (doctor) => {
        setDoctorToEdit(doctor);
        setFormVisible(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:5555/doctors/${id}`);
        fetchDoctors();
    };

    if (loading) {
        return <div>Loading doctors...</div>;
    }

    if (error) {
        return <div>Error loading doctors: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Doctors</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Speciality</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.length > 0 ? (
                        doctors.map(doctor => (
                            <tr key={doctor.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{doctor.name}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{doctor.email}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{doctor.speciality}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    <button onClick={() => handleEdit(doctor)} style={{ marginRight: '10px' }}>Edit</button>
                                    <button onClick={() => handleDelete(doctor.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ border: '1px solid black', padding: '8px' }}>No doctors found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={toggleForm}>{formVisible ? 'Cancel' : 'Add Doctor'}</button>
            </div>
            {formVisible && (
                <DoctorForm
                    onClose={toggleForm}
                    onDoctorAdded={fetchDoctors}
                    doctorToEdit={doctorToEdit} // Pass doctor to edit
                />
            )}
        </div>
    );
};

export default DoctorList;
