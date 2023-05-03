import { Request, Response } from "express";
import { Op } from "sequelize";
import { getAllUsers, createUser, updateUser } from "../firebase";
import { Doctor } from "../models/doctor.model";
import { Appointment } from "../models/appointments.model";
import { Department } from "../models/departments.model";
import { Patient } from "../models/patient.model";

const adminController = {
    createDoctor: async (req: Request, res: Response) => {
        const { displayName, email, password, departmentId } = req.body;

        if (!displayName || !email || !password) {
            return res.status(400).json({ error: 'Missing fields!' });
        }

        const users = await getAllUsers();

        let user = users.find((user) => {
            if (user.email === email || user.userName === displayName) {
                return user
            }
        });

        if (user) {
            res.status(400).json({ error: "The user already exists!" });
        } else {
            try {
                const user_id = await createUser(displayName, email, password, 'doctor');
                await Doctor.create({ 
                    user_id: user_id,
                    doctor_name:displayName,
                    department_id:departmentId
                 });

                return res.status(201).json({ success: `A new doctor with id: ${user_id} was created successfully!` })
            } catch (error) {
                return res.status(500).json({ error: 'Something went wrong!' });
            }
        }

    },
    getDoctors:async (req:Request, res:Response) => {
      try {
        const doctors = await Doctor.findAll({
            include: {
                model: Department,
                attributes: ["department"]
            },
            // attributes:["doctor_id", "doctor_name"]
        });

        if(!doctors){
            return res.status(404).json({error: "Empty list!"})
        }

        return res.status(200).json({success: doctors})
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong!' });
      }  
    },
    updateDoctor:async (req:Request, res: Response) => {
        try {
            const {displayName, email, password, departmentId} = req.body;
            const {id} = req.params;

            const doc = await Doctor.findByPk(id);

            if(!doc) return res.status(404).json({error: "Not Found!"});

            doc.doctor_name = displayName;
            doc.department_id=departmentId;

            await doc.save();
            
            updateUser(doc.user_id, displayName, email, password);

            return res.status(200).json(doc)
            
        } catch (error) {
            return res.status(500).json({error: 'Something went wrong!'})
        }
    },
    deleteDoctor:async (req:Request, res:Response) => {
            try {
                const { id } = req.params;
                const doctor = await Doctor.findByPk(id);
    
                if (!doctor) {
                    return res.status(404).json({ error: "The doctor doesn't exist!" });
                }
                await Doctor.destroy({
                    where: {
                        doctor_id: id
                    }
                })
    
                return res.status(200).json({success: "Doctor deleted"});
        } catch (error) {
        return res.status(500).json({ error: 'Something went wrong!' });
        }
    },
    createPatient: async (req: Request, res: Response) => {
        const { displayName, email, password } = req.body;

        if (!displayName || !email || !password) {
            return res.status(400).json({ error: 'Missing fields!' });
        }

        const users = await getAllUsers();

        let user = users.find((user) => {
            if (user.email === email || user.userName === displayName) {
                return user
            }
        });

        if (user) {
            res.status(400).json({ error: "The user already exists!" });
        } else {
            try {
                const user_id = await createUser(displayName, email, password, 'patient');
                await Patient.create({ 
                    user_id: user_id,
                    patient_name:displayName
                 });

                return res.status(201).json({ success: `A new patient with id: ${user_id} was created successfully!` })
            } catch (error) {
                return res.status(500).json({ error: 'Something went wrong!' });
            }
        }

    },
    getPatients:async (req:Request, res:Response) => {
        try {
          const patients = await Patient.findAll({
            attributes: ["patient_id", "patient_name", "user_id"]
          });
  
          if(!patients){
              return res.status(404).json({error: "Empty list!"})
          }
  
          return res.status(200).json({success: patients})
        } catch (error) {
          return res.status(500).json({ error: 'Something went wrong!' });
        }  
      },
    updatePatient:async (req:Request, res: Response) => {
        try {
            const {displayName, email, password} = req.body;
            const {id} = req.params;

            const patient = await Patient.findByPk(id);

            if(!patient) return res.status(404).json({error: "Not Found!"});

            patient.patient_name = displayName;

            await patient.save();
            
            updateUser(patient.user_id, displayName, email, password);

            return res.status(200).json(patient)
            
        } catch (error) {
            return res.status(500).json({error: 'Something went wrong!'})
        }
    },
    deletePatient:async (req:Request, res:Response) => {
        try {
            const { id } = req.params;
            const patient = await Patient.findByPk(id);

            if (!patient) {
                return res.status(404).json({ error: "The patient doesn't exist!" });
            }
            await Patient.destroy({
                where: {
                    patient_id: id
                }
            })

            return res.status(200).json({success: "Patient deleted"});
    } catch (error) {
    return res.status(500).json({ error: 'Something went wrong!' });
    }
},
    getAppointments: async (req: Request, res: Response) => {
        const { page = 0, size = 5, patientId, doctorId, appointmentActives, orderBy } = req.query;

        if (patientId) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                patient_id: Number(patientId)
            }
            try {
                const { count, rows } = await Appointment.findAndCountAll({
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
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
        else if (doctorId) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                doctor_id: Number(doctorId)
            }
            try {
                const { count, rows } = await Appointment.findAndCountAll({
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
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
        else if (appointmentActives) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                status: String(appointmentActives)
            }
            if (options.status === "true" || options.status === "false") {
                try {
                    const { count, rows } = await Appointment.findAndCountAll({
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
                    })
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Something went wrong!" });
                }
            } else {
                return res.status(400).send("No valid query!");
            }
        }
        else if (orderBy && typeof orderBy === "string") {
            const query = orderBy
            const splittedQuery = query.split("-");
            const entity = splittedQuery[0];
            const entity_id = splittedQuery[1];
            const order = splittedQuery[2];
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                order: String(order),
                id: Number(entity_id)
            }
            if (entity === "patient") {
                try {
                    const { count, rows } = await Appointment.findAndCountAll({
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
                    })
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Something went wrong!" });
                }
            } else if (entity === "doctor") {
                try {
                    const { count, rows } = await Appointment.findAndCountAll({
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
                    })
                } catch (error) {
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
            }
            try {
                const { count, rows } = await Appointment.findAndCountAll({
                    offset: options.offset,
                    limit: options.limit,
                    where: {
                        appointment_id: {
                            [Op.gt]: 0
                        }
                    },
                    paranoid: false
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
        }
    }
}

export default adminController;