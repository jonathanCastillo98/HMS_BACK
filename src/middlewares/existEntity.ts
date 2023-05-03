/* Middleware to check if the entities already exist */

import { Request, Response } from "express";
import { Patient } from "../models/patient.model";
import { getAllUsers } from "../firebase";
import { Doctor } from "../models/doctor.model";
import { Appointment } from "../models/appointments.model";

// Function to verify if a patient already exists in the patient table
export const existPatient = async (_req: Request, res: Response, next: Function) => {
    try {
        const users = await getAllUsers();
        let user = users.find((user) => {
            if (user.uid === res.locals.uid && user.isDisabled === false) {
                return user
            }
        });
        if (user) {
            const patient = await Patient.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (patient) {
                res.locals = {
                    ...res.locals,
                    patient_id: patient.patient_id
                };
            }
            return next();
        } else {
            return res.status(400).json({ error: `No patient found with that id!` });
        }
    } catch (error) {
        return res.status(500).json("Something went wrong!");
    }
};

// Function to verify if a doctor already exists in the doctor table
export const existDoctor = async (_req: Request, res: Response, next: Function) => {
    try {
        const users = await getAllUsers();
        let user = users.find((user) => {
            if (user.uid === res.locals.uid && user.isDisabled === false) {
                return user
            }
        });
        if (user) {
            const doctor = await Doctor.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (doctor) {
                res.locals = {
                    ...res.locals,
                    doctor_id: doctor.doctor_id
                };
            }
            return next();
        } else {
            return res.status(400).json({ error: `No doctor found with that id!` });
        }
    } catch (error) {
        return res.status(500).json("Something went wrong!");
    }
};

export const existAppointment = async (req: Request, res: Response, next: Function) => {
    const { doctor_id, date } = req.body;
    const { patient_id } = res.locals;

    const appointmentID = Number(req.params['id']);

    if (doctor_id && date) {
        try {
            const appointment = await Appointment.findOne({
                where: {
                    patient_id: patient_id,
                    doctor_id: doctor_id,
                    date: date,
                    status: true,
                },
            });
            if (appointment) {
                return res.status(400).json({ error: `The appointment already exists!` });
            } else {
                return next();
            }
        } catch (error) {
            return res.status(500).json(({ error: "Something went wrong!" }));
        }
    } else if (appointmentID) {
        try {
            const appointment = await Appointment.findOne({
                where: {
                    appointment_id: appointmentID
                }
            });
            if (appointment) {
                return next();
            } else {
                return res.status(404).json({ error: "The appointment does not exist!" })
            }
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong!" })
        }
    }
};