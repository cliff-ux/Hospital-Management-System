import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingDepartment, setEditingDepartment] = useState(null); // For edit functionality

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5555/departments');
            setDepartments(response.data.departments); // Ensure it's an array
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (departmentId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/departments/${departmentId}`);
      fetchDepartments(); // Refresh the list after deletion
    } catch (error) {
      setError('Error deleting department');
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setFormVisible(true);
  };

const toggleForm = () => {
    setFormVisible(!formVisible);
    setEditingAppointment(null); // Reset editing state
  };

    if (loading) return <div>Loading departments...</div>;
    if (error) return <div>Error loading departments: {error}</div>;

    return (
        <div>
            <h1>Departments</h1>
            {formVisible && <DepartmentForm onClose={toggleForm} onDepartmentAdded={fetchDepartments} editingDepartment={editingDepartment} />}

<table className="departments-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.department_id || department.id}>
                <td>{department.department_name}</td>
              <td>
                <button onClick={() => handleEdit(department)}>Edit</button>
                <button onClick={() => handleDelete(department.department_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-department-button" onClick={toggleForm}>
        {formVisible ? 'Cancel'  : 'Add Department'}
      </button>
    </div>
  );
};
            
export default DepartmentList;
