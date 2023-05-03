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
exports.createAdmin = exports.updateTables = void 0;
const patient_model_1 = require("../models/patient.model");
const doctor_model_1 = require("../models/doctor.model");
const admin_model_1 = require("../models/admin.model");
const firebase_1 = require("../firebase");
const updateTables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fireUsers = yield (0, firebase_1.getAllUsers)();
        const patientUsers = yield patient_model_1.Patient.findAll();
        const parsedPatientUsers = patientUsers.map(patientUser => patientUser.toJSON());
        const doctorUsers = yield doctor_model_1.Doctor.findAll();
        const parsedDoctorUsers = doctorUsers.map(doctorUsers => doctorUsers.toJSON());
        const adminUsers = yield admin_model_1.Admin.findAll();
        const parsedAdminUsers = adminUsers.map(adminUsers => adminUsers.toJSON());
        const patientNotInFire = parsedPatientUsers.filter(patient => !fireUsers.find(firePatient => firePatient.uid === patient.user_id));
        const doctorNotInFire = parsedDoctorUsers.filter(doctor => !fireUsers.find(fireDoctor => fireDoctor.uid === doctor.user_id));
        const adminNotInFire = parsedAdminUsers.filter(admin => !fireUsers.find(fireAdmin => fireAdmin.uid === admin.user_id));
        const patientNotinDb = fireUsers.filter(user => user.role === "patient").filter(firePatient => !parsedPatientUsers.find(patient => patient.user_id === firePatient.uid));
        const doctorNotinDb = fireUsers.filter(user => user.role === "doctor").filter(fireDoctor => !parsedDoctorUsers.find(doctor => doctor.user_id === fireDoctor.uid));
        const adminNotinDb = fireUsers.filter(user => user.role === "admin").filter(fireAdmin => !parsedAdminUsers.find(admin => admin.user_id === fireAdmin.uid));
        if (patientNotInFire) {
            patientNotInFire.forEach((patient) => __awaiter(void 0, void 0, void 0, function* () {
                yield patient_model_1.Patient.destroy({
                    where: {
                        user_id: patient.user_id
                    }
                });
            }));
        }
        if (doctorNotInFire) {
            doctorNotInFire.forEach((doctor) => __awaiter(void 0, void 0, void 0, function* () {
                yield doctor_model_1.Doctor.destroy({
                    where: {
                        user_id: doctor.user_id
                    }
                });
            }));
        }
        if (adminNotInFire) {
            adminNotInFire.forEach((admin) => __awaiter(void 0, void 0, void 0, function* () {
                yield admin_model_1.Admin.destroy({
                    where: {
                        user_id: admin.user_id
                    }
                });
            }));
        }
        if (patientNotinDb) {
            patientNotinDb.forEach((patient) => __awaiter(void 0, void 0, void 0, function* () {
                (0, firebase_1.deleteUser)(patient.uid);
            }));
        }
        if (doctorNotinDb) {
            doctorNotinDb.forEach((doctor) => __awaiter(void 0, void 0, void 0, function* () {
                (0, firebase_1.deleteUser)(doctor.uid);
            }));
        }
        if (adminNotinDb) {
            adminNotinDb.forEach((admin) => __awaiter(void 0, void 0, void 0, function* () {
                (0, firebase_1.deleteUser)(admin.uid);
            }));
        }
        console.log("All tables are sync");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTables = updateTables;
const createAdmin = (displayName, email, pswrd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield (0, firebase_1.getAllUsers)();
        let user = userList.find((user) => {
            return user.email === email;
        });
        if (user) {
            console.log("The user already exists");
        }
        else {
            const userId = yield (0, firebase_1.createUser)(displayName, email, pswrd, "admin");
            const admin = admin_model_1.Admin.create({ user_id: userId });
            return admin;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createAdmin = createAdmin;
