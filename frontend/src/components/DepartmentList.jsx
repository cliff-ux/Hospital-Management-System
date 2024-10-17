import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/departments');
            if (response.data && Array.isArray(response.data.departments)) {
                setDepartments(response.data.departments); // Ensure it's an array
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
        return <div>Loading departments...</div>; // Loading state
    }

    if (error) {
        return <div>Error loading departments: {error}</div>; // Error state
    }

    return (
        <div>
            <h1>Departments</h1>
            <button onClick={toggleForm}>{formVisible ? 'Cancel' : 'Add Department'}</button>
            {formVisible && <DepartmentForm onClose={toggleForm} onDepartmentAdded={fetchDepartments} />}
            <ul>
                {departments.map(department => (
                    <li key={department.id}>{department.department_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
