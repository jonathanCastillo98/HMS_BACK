import { Request, Response } from "express";
import { Patient } from "../models/patient.model";
import { createUser, getAllUsers} from "../firebase";

const userController = {
    createUser: async (req: Request, res: Response) => {
        const { displayName, email, password } = req.body;

        if (!displayName || !email || !password) {
            return res.status(400).send({ error: 'Missing fields!' });
        }

        const users = await getAllUsers();

        let user = users.find((user) => {
            if (user.email === email || user.userName === displayName) {
                return user
            }
        });

        if (user) {
            res.status(400).send({ error: "This user already exists!" });
        }
        else {
            try {
                const user_id = await createUser(displayName, email, password, 'patient');
                await Patient.create({ 
                    user_id: user_id,
                    patient_name:displayName
                 });
                return res.status(201).send({ success: `A new patient with id: ${user_id} and role patient was created successfully!` })
            } catch (error) {
                return res.status(500).send({ error: 'Something went wrong!' });
            }
        }

    }
}

export default userController;