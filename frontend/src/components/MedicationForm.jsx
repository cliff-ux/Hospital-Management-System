import React, { useState } from 'react';
import axios from 'axios';

const MedicationForm = ({ onClose, onMedicationAdded }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:5555/medication', { name, dosage });
        onMedicationAdded();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Medication Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
            <button type="submit">Add Medication</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default MedicationForm;