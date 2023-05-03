"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = __importDefault(require("./admin.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const patient_routes_1 = __importDefault(require("./patient.routes"));
const doctor_routes_1 = __importDefault(require("./doctor.routes"));
const login_controller_1 = require("../controllers/login.controller");
const router = (0, express_1.Router)();
router.post('/login', login_controller_1.LoginController);
router.use('/user', user_routes_1.default);
router.use('/admin', admin_routes_1.default);
router.use('/patient', patient_routes_1.default);
router.use('/doctor', doctor_routes_1.default);
exports.default = router;
