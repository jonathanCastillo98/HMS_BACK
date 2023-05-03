"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const existEntity_1 = require("../middlewares/existEntity");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const patientRoutes = (0, express_1.Router)();
const { patientController } = controllers_1.default;
patientRoutes.use(isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['patient'], allowSameUser: true }), existEntity_1.existPatient);
patientRoutes.post('/appointments', existEntity_1.existAppointment, patientController.createAppointment);
patientRoutes.get('/appointments/:id', existEntity_1.existAppointment, patientController.getAppointmentById);
patientRoutes.get('/appointments', patientController.getAllPatientAppointments);
patientRoutes.put('/appointments/:id', existEntity_1.existAppointment, patientController.deleteAppointment);
exports.default = patientRoutes;
