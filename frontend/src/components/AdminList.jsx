import React, { useState } from 'react';

const AdminList = () => {
  const [admins, setAdmins] = useState([
    { admin_id: 1, name: 'Abdikhafar Issack', email: 'abdikhafar@hospital.com' },
    { admin_id: 2, name: 'Amos Mokua', email: 'amos@hospital.com' },
    { admin_id: 3, name: 'Cliff Johnson', email: 'cliff@hospital.com' },
    { admin_id: 4, name: 'Mark Davis', email: 'mark@hospital.com' },
  ]);

  return (
    <div className="list-container">
      <h2>Admin List</h2>
      <ul>
        {admins.map((admin) => (
          <li key={admin.admin_id}>
            <span>{admin.name}</span> <span>{admin.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList; // Ensure default export