import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentForm = ({ onClose, onDepartmentAdded, editingDepartment }) => {
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        if (editingDepartment) {
            setDepartmentName(editingDepartment.department_name); // Set current name for editing
        } else {
            setDepartmentName(''); // Reset name if not editing
        }
    }, [editingDepartment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingDepartment) {
            // Ensure the editingDepartment has a valid ID
            if (editingDepartment.id) { // Changed to id
                await axios.patch(`http://127.0.0.1:5555/departments/${editingDepartment.id}`, { department_name: departmentName });
            } else {
                console.error("Editing department ID is undefined.");
            }
        } else {
            await axios.post('http://127.0.0.1:5555/departments', { department_name: departmentName });
        }
        onDepartmentAdded(); // Refresh the list of departments
        onClose(); // Close the form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required
            />
            <button type="submit">{editingDepartment ? 'Update Department' : 'Add Department'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default DepartmentForm;
