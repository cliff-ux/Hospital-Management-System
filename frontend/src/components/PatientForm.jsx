import React, { useState } from 'react'
import axios from axios

const PatientForm = ({onClose, onPatientAdded}) => {
    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.get('http://127.0.0.1:5555/patients', {name, dateOfBirth, email})
        onPatientAdded();
        onClose();
    }
  return (
     <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDateOfBirth(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Add Patient</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
  )
}

export default PatientForm