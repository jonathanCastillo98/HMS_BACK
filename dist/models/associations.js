"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointments_model_1 = require("./appointments.model");
const doctor_model_1 = require("./doctor.model");
const patient_model_1 = require("./patient.model");
const departments_model_1 = require("./departments.model");
/* Appointments -- Doctors */
doctor_model_1.Doctor.hasMany(appointments_model_1.Appointment, {
    foreignKey: 'doctor_id',
    sourceKey: 'doctor_id'
});
appointments_model_1.Appointment.belongsTo(doctor_model_1.Doctor, {
    foreignKey: 'doctor_id',
    targetKey: 'doctor_id'
});
/* Appointments -- Patients */
patient_model_1.Patient.hasMany(appointments_model_1.Appointment, {
    foreignKey: 'patient_id',
    sourceKey: 'patient_id'
});
appointments_model_1.Appointment.belongsTo(patient_model_1.Patient, {
    foreignKey: 'patient_id',
    targetKey: 'patient_id'
});
/* Departments -- Doctors */
departments_model_1.Department.hasMany(doctor_model_1.Doctor, {
    foreignKey: 'department_id',
    sourceKey: 'department_id'
});
doctor_model_1.Doctor.belongsTo(departments_model_1.Department, {
    foreignKey: 'department_id',
    targetKey: 'department_id'
});
