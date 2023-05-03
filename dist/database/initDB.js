"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const updateTables_1 = require("../middlewares/updateTables");
const departments_model_1 = require("../models/departments.model");
const initDb = () => {
    (0, updateTables_1.createAdmin)("admin", "admin@admin.com", "123456789");
    departments_model_1.Department.findOrCreate({
        where: {
            department: "Psicology"
        }
    });
    departments_model_1.Department.findOrCreate({
        where: {
            department: "Cardiology"
        }
    });
    departments_model_1.Department.findOrCreate({
        where: {
            department: "Dermatology"
        }
    });
    departments_model_1.Department.findOrCreate({
        where: {
            department: "Odontology"
        }
    });
};
exports.initDb = initDb;
