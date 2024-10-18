import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MedicationForm from './MedicationForm';

const MedicationList = () => {
    const [medications, setMedications] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingMedication, setEditingMedication] = useState(null);

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/medications');
            if (response.data && Array.isArray(response.data.medications)) {
                setMedications(response.data.medications); // Ensure it's an array
            } 
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const handleDelete = async (id) => {
        
        try {
            await axios.delete(`http://127.0.0.1:5555//medications/${id}`);
            fetchMedications(); // Refresh the list after deletion
        } catch (error) {
            setError('Error deleting medication');
        }
    };

    const handleEdit = (medication) => {
        setEditingMedication(medication);
        setFormVisible(true);
    };

    const toggleForm = () => {
        setFormVisible(!formVisible);
        setEditingMedication(true); // Reset editing state
    };

    if (loading) {
        return <div>Loading ...</div>; // Loading state
    }

    if (error) {
        return <div>Error loading Medication: {error}</div>; // Error state
    }

    return (
        <div>
            <h1>Medications</h1>
            <table className="medications-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dosage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medications.map((medication) => (
                        <tr key={medication.medication_id}>
                            <td>{medication.name}</td>
                            <td>{medication.time}</td>
                            <td>
                                <button className="button-spacing" onClick={() => handleEdit(medication)}>Edit</button>
                                <button className="button-spacing" onClick={() => handleDelete(medication.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-medication-button" onClick={toggleForm}>
                {formVisible ? 'Cancel' : 'Add Medication'}
            </button>

      {formVisible && (
        <MedicationForm
          onClose={toggleForm}
          onDoctorAdded={fetchMedications}
          doctorToEdit={editingMedication} // Pass the doctor to edit
        />
      )}        
      </div>
    )
}

export default MedicationList;
