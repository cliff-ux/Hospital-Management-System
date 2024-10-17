import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorForm = ({ onClose, onDoctorAdded, doctorToEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');

    useEffect(() => {
        if (doctorToEdit) {
            setName(doctorToEdit.name);
            setEmail(doctorToEdit.email);
            setSpeciality(doctorToEdit.speciality);
        }
    }, [doctorToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (doctorToEdit) {
            // Update existing doctor
            await axios.put(`http://127.0.0.1:5555/doctors/${doctorToEdit.id}`, {
                name,
                email,
                speciality
            });
        } else {
            // Add new doctor
            await axios.post('http://127.0.0.1:5555/doctors', { name, email, speciality });
        }
        onDoctorAdded();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <input
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
                style={{ marginRight: '10px' }}
            />
            <button type="submit">{doctorToEdit ? 'Update Doctor' : 'Add Doctor'}</button>
            <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
        </form>
    );
};

export default DoctorForm;
