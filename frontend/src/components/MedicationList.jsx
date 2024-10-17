import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MedicationForm from './MedicationForm';

const MedicationList = () => {
    const [medications, setMedications] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMedications();
    }, []);

   const fetchMedications = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/medications');
            if (response.data && Array.isArray(response.data.medications)) {
                setMedications(response.data.medications); // Ensure it's an array
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
        return <div>Loading ...</div>; // Loading state
    }

    if (error) {
        return <div>Error loading Medication: {error}</div>; // Error state
    }

    return (
        <div>
            <h1>Medications</h1>
            <button onClick={toggleForm}>{formVisible ? 'Cancel' : 'Add Medication'}</button>
            {formVisible && <MedicationForm onClose={toggleForm} onMedicationAdded={fetchMedications} />}
            <ul>
                {medications.map(medication => (
                    <li key={medication.id}>{medication.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MedicationList;
