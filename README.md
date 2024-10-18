Hospital management system

# Hospital Management System

## Overview

The Hospital Management System is a web application designed to streamline hospital operations. It utilizes a Flask API backend and a React frontend to manage patient records, appointments, and staff information efficiently. The system implements various relationships between models, ensuring a robust data structure and user-friendly experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Backend Models](#backend-models)
- [Frontend Features](#frontend-features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [Special Thanks](#special-thanks)

## Features

- Full CRUD operations for managing resources.
- Form handling and validation using Formik.
- Dynamic routing with React Router for seamless navigation.
- User-friendly interface with a navigation bar.
- Data type and format validation for input fields.

## Technologies Used

- **Backend**: Flask, SQLAlchemy, Flask-RESTful
- **Frontend**: React, React Router, Formik
- **Database**: SQLite (or any preferred database)
- **Validation**: Formik for form handling and validation

## Backend Models

### 1. Patient

- **Attributes**: `id`, `name`, `age`, `gender`, `appointments`
- **Relationships**: One-to-many with `Appointment`

### 2. Doctor

- **Attributes**: `id`, `name`, `specialization`, `patients`
- **Relationships**: One-to-many with `Patient`

### 3. Appointment

- **Attributes**: `id`, `date`, `time`, `patient_id`, `doctor_id`, `notes`
- **Relationships**:
  - Many-to-one with `Patient`
  - Many-to-one with `Doctor`
  - **User Submittable Attribute**: `notes` (additional information about the appointment)

### 4. Prescription (Many-to-Many Relationship)

- **Attributes**: `id`, `medication_name`, `dosage`, `patients`
- **Relationships**:
  - Many-to-many with `Patient` (through `PatientPrescription` association table)
  - **User Submittable Attribute**: `dosage`

## Frontend Features

- **Routing**: At least three different client-side routes, including:
  - `/patients`: View and manage patients
  - `/doctors`: View and manage doctors
  - `/appointments`: Schedule and manage appointments
- **Navigation**: A navigation bar to switch between routes easily.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/hospital-management-system.git
    cd hospital-management-system
    ```

    Usage

        Access the application in your web browser at http://localhost:3000.
        Use the navigation bar to explore different sections of the application.
        Create, read, update, and delete patients, doctors, and appointments through the provided forms.

Contributors

    Cliff Ridley
    Amos
    Abdikafar
    Mark Nyanjui

Special Thanks

    Kihoto Ndoria for support and guidance throughout the project.

License

This project is licensed under the MIT License - see the LICENSE file for details.
