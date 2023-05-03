"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Department extends sequelize_1.Model {
}
exports.Department = Department;
Department.init({
    department_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "departments",
    sequelize: connection_1.sequelize,
});
