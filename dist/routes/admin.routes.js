"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const adminRoutes = (0, express_1.Router)();
const { adminController } = controllers_1.default;
adminRoutes.use(isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }));
// Doctors
adminRoutes.post('/doctors', adminController.createDoctor);
adminRoutes.get('/doctors', adminController.getDoctors);
adminRoutes.put('/doctors/:id', adminController.updateDoctor);
adminRoutes.delete('/doctors/:id', adminController.deleteDoctor);
// Patients
adminRoutes.post('/patients', adminController.createPatient);
adminRoutes.get('/patients', adminController.getPatients);
adminRoutes.put('/patients/:id', adminController.updatePatient);
adminRoutes.delete('/patients/:id', adminController.deletePatient);
adminRoutes.get('/appointments', adminController.getAppointments);
exports.default = adminRoutes;
