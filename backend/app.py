from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from datetime import datetime
from models import db, Doctor, Department, Patient, Appointment, Medication, MedicalRecord
from flask_jwt_extended import JWTManager, create_access_token, jwt_required

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hospital.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"

# Initialize extensions
jwt = JWTManager(app)
CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

class Index(Resource):
    def get(self):
        return make_response({"index": "Welcome to the hospital system"}, 200)

api.add_resource(Index, '/')

class Doctors(Resource):
    def get(self):
        doctors = Doctor.query.all()
        return make_response({"count": len(doctors), "doctors": [doctor.to_dict() for doctor in doctors]}, 200)

    def post(self):
        new_doctor = Doctor(
            name=request.json.get("name"),
            email=request.json.get("email"),
            speciality=request.json.get("speciality")
        )
        db.session.add(new_doctor)
        db.session.commit()
        return make_response(new_doctor.to_dict(), 201)

api.add_resource(Doctors, '/doctors')

class DoctorsByID(Resource):
    def get(self, id):
        doctor = Doctor.query.get(id)
        if not doctor:
            return make_response({"message": "This record does not exist."}, 404)
        return make_response(doctor.to_dict(), 200)

    def patch(self, id):
        doctor = Doctor.query.get(id)
        if not doctor:
            return make_response({"message": "This record does not exist."}, 404)

        for attr, value in request.json.items():
            setattr(doctor, attr, value)
        db.session.commit()
        return make_response(doctor.to_dict(), 200)

    def delete(self, id):
        doctor = Doctor.query.get(id)
        if not doctor:
            return make_response({"message": "This record does not exist."}, 404)

        db.session.delete(doctor)
        db.session.commit()
        return make_response({"message": "Doctor deleted."}, 200)

api.add_resource(DoctorsByID, '/doctors/<int:id>')

# Similar classes for Departments, Patients, Appointments, Medications, MedicalRecords

# Example for Departments
class Departments(Resource):
    def get(self):
        departments = Department.query.all()
        return make_response({"count": len(departments), "departments": [dept.to_dict() for dept in departments]}, 200)

    def post(self):
        new_department = Department(
            department_name=request.json.get("department_name")
        )
        db.session.add(new_department)
        db.session.commit()
        return make_response(new_department.to_dict(), 201)

api.add_resource(Departments, '/departments')

class DepartmentsByID(Resource):
    def get(self, id):
        department = Department.query.get(id)
        if not department:
            return make_response({"message": "This record does not exist."}, 404)
        return make_response(department.to_dict(), 200)

    def patch(self, id):
        department = Department.query.get(id)
        if not department:
            return make_response({"message": "This record does not exist."}, 404)

        for attr, value in request.json.items():
            setattr(department, attr, value)
        db.session.commit()
        return make_response(department.to_dict(), 200)

    def delete(self, id):
        department = Department.query.get(id)
        if not department:
            return make_response({"message": "This record does not exist."}, 404)

        db.session.delete(department)
        db.session.commit()
        return make_response({"message": "Department deleted."}, 200)

api.add_resource(DepartmentsByID, '/departments/<int:id>')

# Implement similar classes for Patients, Appointments, Medications, MedicalRecords

if __name__ == "__main__":
    app.run(port=5555, debug=True)
