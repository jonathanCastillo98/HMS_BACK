"use strict";
/* Middleware to check if the entities already exist */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existAppointment = exports.existDoctor = exports.existPatient = void 0;
const patient_model_1 = require("../models/patient.model");
const firebase_1 = require("../firebase");
const doctor_model_1 = require("../models/doctor.model");
const appointments_model_1 = require("../models/appointments.model");
// Function to verify if a patient already exists in the patient table
const existPatient = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            if (user.uid === res.locals.uid && user.isDisabled === false) {
                return user;
            }
        });
        if (user) {
            const patient = yield patient_model_1.Patient.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (patient) {
                res.locals = Object.assign(Object.assign({}, res.locals), { patient_id: patient.patient_id });
            }
            return next();
        }
        else {
            return res.status(400).json({ error: `No patient found with that id!` });
        }
    }
    catch (error) {
        return res.status(500).json("Something went wrong!");
    }
});
exports.existPatient = existPatient;
// Function to verify if a doctor already exists in the doctor table
const existDoctor = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            if (user.uid === res.locals.uid && user.isDisabled === false) {
                return user;
            }
        });
        if (user) {
            const doctor = yield doctor_model_1.Doctor.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (doctor) {
                res.locals = Object.assign(Object.assign({}, res.locals), { doctor_id: doctor.doctor_id });
            }
            return next();
        }
        else {
            return res.status(400).json({ error: `No doctor found with that id!` });
        }
    }
    catch (error) {
        return res.status(500).json("Something went wrong!");
    }
});
exports.existDoctor = existDoctor;
const existAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctor_id, date } = req.body;
    const { patient_id } = res.locals;
    const appointmentID = Number(req.params['id']);
    if (doctor_id && date) {
        try {
            const appointment = yield appointments_model_1.Appointment.findOne({
                where: {
                    patient_id: patient_id,
                    doctor_id: doctor_id,
                    date: date,
                    status: true,
                },
            });
            if (appointment) {
                return res.status(400).json({ error: `The appointment already exists!` });
            }
            else {
                return next();
            }
        }
        catch (error) {
            return res.status(500).json(({ error: "Something went wrong!" }));
        }
    }
    else if (appointmentID) {
        try {
            const appointment = yield appointments_model_1.Appointment.findOne({
                where: {
                    appointment_id: appointmentID
                }
            });
            if (appointment) {
                return next();
            }
            else {
                return res.status(404).json({ error: "The appointment does not exist!" });
            }
        }
        catch (error) {
            return res.status(500).json({ error: "Something went wrong!" });
        }
    }
});
exports.existAppointment = existAppointment;
