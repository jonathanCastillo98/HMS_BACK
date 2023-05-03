"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Doctor extends sequelize_1.Model {
}
exports.Doctor = Doctor;
Doctor.init({
    doctor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    doctor_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    department_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    is_available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "doctors",
    sequelize: connection_1.sequelize
});
