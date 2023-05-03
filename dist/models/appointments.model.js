"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
Appointment.init({
    appointment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    doctor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "appointments",
    sequelize: connection_1.sequelize,
    // For soft delete
    paranoid: true,
    deletedAt: 'softDelete'
});
