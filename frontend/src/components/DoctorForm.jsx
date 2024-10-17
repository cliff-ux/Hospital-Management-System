import React, { useState } from 'react';
import axios from 'axios';

const DoctorForm = ({ onClose, onDoctorAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [speciality, setSpeciality] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:5555/doctors', { name, email, speciality });
        onDoctorAdded();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
            <button type="submit">Add Doctor</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default DoctorForm;
