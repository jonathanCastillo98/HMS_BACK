import { Patient } from "../models/patient.model";
import { Doctor } from "../models/doctor.model";
import { Admin } from "../models/admin.model";
import { getAllUsers, createUser, deleteUser } from "../firebase";


export const updateTables = async () => {
    try {
        const fireUsers = await getAllUsers();
        const patientUsers = await Patient.findAll();
        const parsedPatientUsers = patientUsers.map(patientUser => patientUser.toJSON());
        const doctorUsers = await Doctor.findAll();
        const parsedDoctorUsers = doctorUsers.map(doctorUsers => doctorUsers.toJSON());
        const adminUsers = await Admin.findAll();
        const parsedAdminUsers = adminUsers.map(adminUsers => adminUsers.toJSON());

        const patientNotInFire = parsedPatientUsers.filter(patient => !fireUsers.find(firePatient => firePatient.uid === patient.user_id));
        const doctorNotInFire = parsedDoctorUsers.filter(doctor => !fireUsers.find(fireDoctor => fireDoctor.uid === doctor.user_id));
        const adminNotInFire = parsedAdminUsers.filter(admin => !fireUsers.find(fireAdmin => fireAdmin.uid === admin.user_id));

        const patientNotinDb = fireUsers.filter(user => user.role === "patient").filter(firePatient => !parsedPatientUsers.find(patient => patient.user_id === firePatient.uid))
        const doctorNotinDb = fireUsers.filter(user => user.role === "doctor").filter(fireDoctor => !parsedDoctorUsers.find(doctor => doctor.user_id === fireDoctor.uid))
        const adminNotinDb = fireUsers.filter(user => user.role === "admin").filter(fireAdmin => !parsedAdminUsers.find(admin => admin.user_id === fireAdmin.uid))

        if (patientNotInFire) {
            patientNotInFire.forEach(async patient => {
                await Patient.destroy({
                    where: {
                        user_id: patient.user_id
                    }
                })
            })
        }
        if (doctorNotInFire) {
            doctorNotInFire.forEach(async doctor => {
                await Doctor.destroy({
                    where: {
                        user_id: doctor.user_id
                    }
                })
            })
        } 
        if (adminNotInFire) {
            adminNotInFire.forEach(async admin => {
                await Admin.destroy({
                    where: {
                        user_id: admin.user_id
                    }
                })
            })
        }

        if (patientNotinDb) {
            patientNotinDb.forEach(async patient => {
                deleteUser(patient.uid)
            })
        }

        if (doctorNotinDb) {
            doctorNotinDb.forEach(async doctor => {
                deleteUser(doctor.uid)
            })
        }

        if (adminNotinDb) {
            adminNotinDb.forEach(async admin => {
                deleteUser(admin.uid)
            })
        }
        console.log("All tables are sync")
    } catch (error) {
        console.log(error)
    }
}


export const createAdmin = async (displayName: string, email: string, pswrd: string) => {
    try {

        const userList = await getAllUsers();
        let user = userList.find((user) => {
            return user.email === email
        });

        if (user) {
            console.log("The user already exists")
        } else {
            const userId = await createUser(displayName, email, pswrd, "admin");
            const admin = Admin.create({ user_id: userId })
            return admin;
        }


    } catch (error) {

        console.error(error);

        return null

    }

}