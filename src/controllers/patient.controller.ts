import { Request, Response } from "express";
import { Appointment } from "../models/appointments.model";
import { Patient } from "../models/patient.model";


const patientController = {
    createAppointment: async (req: Request, res: Response) => {
        const { doctor_id, date } = req.body;
        const { patient_id } = res.locals;

        console.log(date, "DATEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe")


        if (!doctor_id || !date) {
            return res.status(400).json({ error: 'Missing fields!' })
        }

        if (!patient_id) {
            return res.status(400).json({ error: 'Missing patient!' })
        }

        try {
            const newAppointment = await Appointment.create({
                doctor_id,
                patient_id,
                date
            });

            return res.status(200).json({ success: "Appointment created successfully!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" })
        }
    },
    getAppointmentById: async (req: Request, res: Response) => {
        const { uid } = res.locals;
        const appointmentId = Number(req.params['id']);

        if (appointmentId <= 0) {
            res.status(400).json({ error: 'Invalid id!' })
        }
        try {
            const foundAppointment = await Appointment.findOne({
                include: {
                    model: Patient,
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
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });

        }
    },
    getAllPatientAppointments: async (req: Request, res: Response) => {
        const { uid } = res.locals;
        const { page = 0, size = 5 } = req.query;

        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size)
        }
        try {
            const { count, rows } = await Appointment.findAndCountAll({
                offset: options.offset,
                limit: options.limit,
                include: {
                    model: Patient,
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
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    },
    deleteAppointment: async (req: Request, res: Response) => {
        const appointmentId = Number(req.params['id']);

        try {
            await Appointment.update({
                status: false
            }, {
                where: {
                    appointment_id: appointmentId
                }
            })
            await Appointment.destroy({
                where: {
                    appointment_id: appointmentId
                }
            })
            return res.status(200).json({ success: "Appointment deleted successfully!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Something went wrong!" });
        }
    }
}

export default patientController;