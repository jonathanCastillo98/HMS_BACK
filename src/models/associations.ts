import { Appointment } from "./appointments.model"
import { Doctor } from "./doctor.model"
import { Patient } from "./patient.model"
import { Department } from "./departments.model"


/* Appointments -- Doctors */

Doctor.hasMany(Appointment, {
    foreignKey: 'doctor_id',
    sourceKey: 'doctor_id'
});

Appointment.belongsTo(Doctor, {
    foreignKey: 'doctor_id',
    targetKey: 'doctor_id'
});

/* Appointments -- Patients */

Patient.hasMany(Appointment, {
    foreignKey: 'patient_id',
    sourceKey: 'patient_id'
});

Appointment.belongsTo(Patient, {
    foreignKey: 'patient_id',
    targetKey: 'patient_id'
});

/* Departments -- Doctors */

Department.hasMany(Doctor, {
    foreignKey: 'department_id',
    sourceKey: 'department_id'
});

Doctor.belongsTo(Department, {
    foreignKey: 'department_id',
    targetKey: 'department_id'
})

