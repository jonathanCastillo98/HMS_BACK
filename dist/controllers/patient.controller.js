"use strict";
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
const appointments_model_1 = require("../models/appointments.model");
const patient_model_1 = require("../models/patient.model");
const patientController = {
    createAppointment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { doctor_id, date } = req.body;
        const { patient_id } = res.locals;
        console.log(date, "DATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe");
        if (!doctor_id || !date) {
            return res.status(400).json({ error: 'Missing fields!' });
        }
        if (!patient_id) {
            return res.status(400).json({ error: 'Missing patient!' });
        }
        try {
            const newAppointment = yield appointments_model_1.Appointment.create({
                doctor_id,
                patient_id,
                date
            });
            return res.status(200).json({ success: "Appointment created successfully!" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    }),
    getAppointmentById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { uid } = res.locals;
        const appointmentId = Number(req.params['id']);
        if (appointmentId <= 0) {
            res.status(400).json({ error: 'Invalid id!' });
        }
        try {
            const foundAppointment = yield appointments_model_1.Appointment.findOne({
                include: {
                    model: patient_model_1.Patient,
                    attributes: ['patient_id'],
                    where: {
                        user_id: uid
                    }
                },
                where: {
                    appointment_id: appointmentId
                }
            });
            return res.status(200).json({ success: foundAppointment });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    }),
    getAllPatientAppointments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { uid } = res.locals;
        const { page = 0, size = 5 } = req.query;
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size)
        };
        try {
            const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
                include: {
                    model: patient_model_1.Patient,
                    attributes: ['patient_id'],
                    where: {
                        user_id: uid
                    }
                },
                where: {
                    status: true
                }
            });
            return res.status(200).json({
                status: "success",
                total: count,
                appointment: rows
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    }),
    deleteAppointment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentId = Number(req.params['id']);
        try {
            yield appointments_model_1.Appointment.update({
                status: false
            }, {
                where: {
                    appointment_id: appointmentId
                }
            });
            yield appointments_model_1.Appointment.destroy({
                where: {
                    appointment_id: appointmentId
                }
            });
            return res.status(200).json({ success: "Appointment deleted successfully!" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    })
};
exports.default = patientController;
