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
const patient_model_1 = require("../models/patient.model");
const firebase_1 = require("../firebase");
const userController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { displayName, email, password } = req.body;
        if (!displayName || !email || !password) {
            return res.status(400).send({ error: 'Missing fields!' });
        }
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            if (user.email === email || user.userName === displayName) {
                return user;
            }
        });
        if (user) {
            res.status(400).send({ error: "This user already exists!" });
        }
        else {
            try {
                const user_id = yield (0, firebase_1.createUser)(displayName, email, password, 'patient');
                yield patient_model_1.Patient.create({
                    user_id: user_id,
                    patient_name: displayName
                });
                return res.status(201).send({ success: `A new patient with id: ${user_id} and role patient was created successfully!` });
            }
            catch (error) {
                return res.status(500).send({ error: 'Something went wrong!' });
            }
        }
    })
};
exports.default = userController;
