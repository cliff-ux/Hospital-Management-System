from app import app, db
from models import Doctor, Department, Patient, Appointment, Medication, MedicalRecord

# Seed data
def seed_data():
    with app.app_context():
        db.create_all()  # Create tables

        # Seed Doctors
        doctors = [
            Doctor(name='Dr. John Smith', email='john.smith@example.com', speciality='Cardiology'),
            Doctor(name='Dr. Jane Doe', email='jane.doe@example.com', speciality='Pediatrics'),
        ]

        # Seed Departments
        departments = [
            Department(department_name='Cardiology'),
            Department(department_name='Pediatrics'),
        ]

        # Seed Patients
        patients = [
            Patient(name='Alice Brown', age=30, gender='Female', date_of_birth='1993-05-20'),
            Patient(name='Bob White', age=40, gender='Male', date_of_birth='1983-12-15'),
        ]

        # Add to session
        db.session.bulk_save_objects(doctors + departments + patients)
        db.session.commit()

        print("Seed data inserted.")

if __name__ == "__main__":
    seed_data()
