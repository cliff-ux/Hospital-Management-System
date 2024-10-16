import React from "react";

const DoctorsList = () => {
  const doctors = [
    {
      doctor_id: 1,
      name: "Dr. Alice Mwangi",
      specialization: "Cardiologist",
      contact_number: "+254701234567",
      department: "Cardiology",
    },
    {
      doctor_id: 2,
      name: "Dr. Issack Ali",
      specialization: "Neurologist",
      contact_number: "+254712345678",
      department: "Neurology",
    },
    {
      doctor_id: 3,
      name: "Dr. Milton Obilo",
      specialization: "Orthopedic surgeon",
      contact_number: "+254722345679",
      department: "Orthopedics",
    },
    {
      doctor_id: 4,
      name: "Dr. Wambua Steven",
      specialization: "Dermatologist",
      contact_number: "+254733456789",
      department: "Dermatology",
    },
    {
      doctor_id: 5,
      name: "Dr. Elizabeth Anyango",
      specialization: "Pediatrician",
      contact_number: "+254744567890",
      department: "Pediatrics",
    },
    {
      doctor_id: 6,
      name: "Dr. Frank Martin",
      specialization: "Ophthalmologist",
      contact_number: "+254755678901",
      department: "Ophthalmology",
    },
    {
      doctor_id: 7,
      name: "Dr. Grace Wambui",
      specialization: "Gynecologist",
      contact_number: "+254766789012",
      department: "Gynecology",
    },
    {
      doctor_id: 8,
      name: "Dr. Henry Elvis",
      specialization: "General Surgeon",
      contact_number: "+254777890123",
      department: "Surgery",
    },
    {
      doctor_id: 9,
      name: "Dr. Duncun Gikonyo",
      specialization: "Psychiatrist",
      contact_number: "+254788901234",
      department: "Psychiatry",
    },
    {
      doctor_id: 10,
      name: "Dr. James Kelvin",
      specialization: "Endocrinologist",
      contact_number: "+254799012345",
      department: "Endocrinology",
    },
  ];

  return (
    <div>
      <h2>Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id}>
            <strong>Name:</strong> {doctor.name} <br />
            <strong>Specialization:</strong> {doctor.specialization} <br />
            <strong>Contact:</strong> {doctor.contact_number} <br />
            <strong>Department:</strong> {doctor.department} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;