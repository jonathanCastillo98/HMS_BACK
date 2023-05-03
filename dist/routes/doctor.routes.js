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
const doctorRoutes = (0, express_1.Router)();
const { doctorController } = controllers_1.default;
doctorRoutes.use(isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['doctor'], allowSameUser: true }), existEntity_1.existDoctor);
doctorRoutes.get('/', doctorController.getAllDoctorAppointments);
doctorRoutes.put('/:id', existEntity_1.existAppointment, doctorController.changeDate);
exports.default = doctorRoutes;
