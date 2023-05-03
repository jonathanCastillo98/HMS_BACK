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
const sequelize_1 = require("sequelize");
const firebase_1 = require("../firebase");
const doctor_model_1 = require("../models/doctor.model");
const appointments_model_1 = require("../models/appointments.model");
const departments_model_1 = require("../models/departments.model");
const patient_model_1 = require("../models/patient.model");
const adminController = {
    createDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { displayName, email, password, departmentId } = req.body;
        if (!displayName || !email || !password) {
            return res.status(400).json({ error: 'Missing fields!' });
        }
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            if (user.email === email || user.userName === displayName) {
                return user;
            }
        });
        if (user) {
            res.status(400).json({ error: "The user already exists!" });
        }
        else {
            try {
                const user_id = yield (0, firebase_1.createUser)(displayName, email, password, 'doctor');
                yield doctor_model_1.Doctor.create({
                    user_id: user_id,
                    doctor_name: displayName,
                    department_id: departmentId
                });
                return res.status(201).json({ success: `A new doctor with id: ${user_id} was created successfully!` });
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong!' });
            }
        }
    }),
    getDoctors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctors = yield doctor_model_1.Doctor.findAll({
                include: {
                    model: departments_model_1.Department,
                    attributes: ["department"]
                },
                // attributes:["doctor_id", "doctor_name"]
            });
            if (!doctors) {
                return res.status(404).json({ error: "Empty list!" });
            }
            return res.status(200).json({ success: doctors });
        }
        catch (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }),
    updateDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { displayName, email, password, departmentId } = req.body;
            const { id } = req.params;
            const doc = yield doctor_model_1.Doctor.findByPk(id);
            if (!doc)
                return res.status(404).json({ error: "Not Found!" });
            doc.doctor_name = displayName;
            doc.department_id = departmentId;
            yield doc.save();
            (0, firebase_1.updateUser)(doc.user_id, displayName, email, password);
            return res.status(200).json(doc);
        }
        catch (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }),
    deleteDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const doctor = yield doctor_model_1.Doctor.findByPk(id);
            if (!doctor) {
                return res.status(404).json({ error: "The doctor doesn't exist!" });
            }
            yield doctor_model_1.Doctor.destroy({
                where: {
                    doctor_id: id
                }
            });
            return res.status(200).json({ success: "Doctor deleted" });
        }
        catch (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }),
    createPatient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { displayName, email, password } = req.body;
        if (!displayName || !email || !password) {
            return res.status(400).json({ error: 'Missing fields!' });
        }
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            if (user.email === email || user.userName === displayName) {
                return user;
            }
        });
        if (user) {
            res.status(400).json({ error: "The user already exists!" });
        }
        else {
            try {
                const user_id = yield (0, firebase_1.createUser)(displayName, email, password, 'patient');
                yield patient_model_1.Patient.create({
                    user_id: user_id,
                    patient_name: displayName
                });
                return res.status(201).json({ success: `A new patient with id: ${user_id} was created successfully!` });
            }
            catch (error) {
                return res.status(500).json({ error: 'Something went wrong!' });
            }
        }
    }),
    getPatients: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patients = yield patient_model_1.Patient.findAll({
                attributes: ["patient_id", "patient_name", "user_id"]
            });
            if (!patients) {
                return res.status(404).json({ error: "Empty list!" });
            }
            return res.status(200).json({ success: patients });
        }
        catch (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }),
    updatePatient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { displayName, email, password } = req.body;
            const { id } = req.params;
            const patient = yield patient_model_1.Patient.findByPk(id);
            if (!patient)
                return res.status(404).json({ error: "Not Found!" });
            patient.patient_name = displayName;
            yield patient.save();
            (0, firebase_1.updateUser)(patient.user_id, displayName, email, password);
            return res.status(200).json(patient);
        }
        catch (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }),
    deletePatient: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const patient = yield patient_model_1.Patient.findByPk(id);
            if (!patient) {
                return res.status(404).json({ error: "The patient doesn't exist!" });
            }
            yield patient_model_1.Patient.destroy({
                where: {
                    patient_id: id
                }
            });
            return res.status(200).json({ success: "Patient deleted" });
        }
        catch (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }),
    getAppointments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { page = 0, size = 5, patientId, doctorId, appointmentActives, orderBy } = req.query;
        if (patientId) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                patient_id: Number(patientId)
            };
            try {
                const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                    offset: options.offset,
                    limit: options.limit,
                    where: {
                        patient_id: options.patient_id
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
        }
        else if (doctorId) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                doctor_id: Number(doctorId)
            };
            try {
                const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                    offset: options.offset,
                    limit: options.limit,
                    where: {
                        doctor_id: options.doctor_id
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
        }
        else if (appointmentActives) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                status: String(appointmentActives)
            };
            if (options.status === "true" || options.status === "false") {
                try {
                    const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                        offset: options.offset,
                        limit: options.limit,
                        where: {
                            status: options.status
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
            }
            else {
                return res.status(400).send("No valid query!");
            }
        }
        else if (orderBy && typeof orderBy === "string") {
            const query = orderBy;
            const splittedQuery = query.split("-");
            const entity = splittedQuery[0];
            const entity_id = splittedQuery[1];
            const order = splittedQuery[2];
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                order: String(order),
                id: Number(entity_id)
            };
            if (entity === "patient") {
                try {
                    const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                        offset: options.offset,
                        limit: options.limit,
                        where: {
                            patient_id: options.id
                        },
                        order: [['createdAt', options.order]]
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
            }
            else if (entity === "doctor") {
                try {
                    const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                        offset: options.offset,
                        limit: options.limit,
                        where: {
                            doctor_id: options.id
                        },
                        order: [['createdAt', options.order]]
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
            }
        }
        // Get all appointments
        else {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size)
            };
            try {
                const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                    offset: options.offset,
                    limit: options.limit,
                    where: {
                        appointment_id: {
                            [sequelize_1.Op.gt]: 0
                        }
                    },
                    paranoid: false
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
        }
    })
};
exports.default = adminController;
