import React, { useState } from 'react';
import axios from 'axios';

const DepartmentForm = ({ onClose, onDepartmentAdded }) => {
    const [departmentName, setDepartmentName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:5555/departments', { department_name: departmentName });
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
            <button type="submit">Add Department</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default DepartmentForm;

