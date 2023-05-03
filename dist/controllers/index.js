"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = __importDefault(require("./admin.controller"));
const user_controller_1 = __importDefault(require("./user.controller"));
const patient_controller_1 = __importDefault(require("./patient.controller"));
const doctor_controller_1 = __importDefault(require("./doctor.controller"));
exports.default = {
    adminController: admin_controller_1.default,
    userController: user_controller_1.default,
    patientController: patient_controller_1.default,
    doctorController: doctor_controller_1.default
};
