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
const doctor_model_1 = require("../models/doctor.model");
const appointments_model_1 = require("../models/appointments.model");
const doctorcontroller = {
    getAllDoctorAppointments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { uid } = res.locals;
        const { page = 0, size = 5, orderBy } = req.query;
        if (orderBy && typeof orderBy === "string") {
            const query = orderBy;
            const splittedQuery = query.split("-");
            const entity = splittedQuery[0];
            const order = splittedQuery[1];
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                order: String(order),
            };
            // By date
            if (entity === "date") {
                try {
                    const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                        include: {
                            model: doctor_model_1.Doctor,
                            attributes: ["doctor_id"],
                            where: {
                                user_id: uid
                            }
                        },
                        attributes: ["appointment_id", "date", "status", "patient_id"],
                        offset: options.offset,
                        limit: options.limit,
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
                // By Patient
            }
            else if (entity === "patientId") {
                try {
                    const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                        include: {
                            model: doctor_model_1.Doctor,
                            attributes: ["doctor_id"],
                            where: {
                                user_id: uid
                            }
                        },
                        attributes: ["appointment_id", "date", "status", "patient_id"],
                        offset: options.offset,
                        limit: options.limit,
                        order: [['patient_id', options.order]]
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
        // Get all appointments of the doctor
        else {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size)
            };
            try {
                const { count, rows } = yield appointments_model_1.Appointment.findAndCountAll({
                    offset: options.offset,
                    limit: options.limit,
                    include: {
                        model: doctor_model_1.Doctor,
                        attributes: ['doctor_id'],
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
        }
    }),
    changeDate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentId = Number(req.params['id']);
        const { newDate } = req.body;
        try {
            const doctorAppointment = yield appointments_model_1.Appointment.update({
                date: newDate
            }, {
                where: {
                    appointment_id: appointmentId
                }
            });
            return res.status(200).json({ success: "Date changed succesfully!" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    })
};
exports.default = doctorcontroller;
