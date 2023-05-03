"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Patient extends sequelize_1.Model {
}
exports.Patient = Patient;
Patient.init({
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    patient_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "patients",
    sequelize: connection_1.sequelize
});
