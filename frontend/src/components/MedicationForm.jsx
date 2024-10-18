import axios from "axios";
import React, { useEffect, useState } from 'react';


const MedicationForm = ({ onClose, onMedicationAdded, editingMedication }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');

    useEffect(() => {
        if (editingMedication) {
            setName(editingMedication.name);
            setDosage(editingMedication.dosage);
        }
    }, [editingMedication]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingMedication) {
                // Update existing medication
                await axios.patch(`http://127.0.0.1:5555/medications/${editingMedication.medication_id || editingMedication.id}`, {
                    name,
                    dosage
                });
            } else {
                // Add new medication
                await axios.post('http://127.0.0.1:5555/medications', { name, dosage });
            }

            onMedicationAdded();
            onClose();
        } catch (error) {
            console.error('Error saving medication:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Medication Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
            />
            <button type="submit">{editingMedication ? 'Update Medication' : 'Add Medication'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default MedicationForm;