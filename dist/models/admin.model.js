"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Admin extends sequelize_1.Model {
}
exports.Admin = Admin;
Admin.init({
    admin_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "admins",
    sequelize: connection_1.sequelize
});
