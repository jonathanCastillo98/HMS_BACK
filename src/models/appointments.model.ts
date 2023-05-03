import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
    declare appointment_id: CreationOptional<number>;
    declare doctor_id: number;
    declare patient_id: number;
    declare date: Date;
    declare status: CreationOptional<boolean>;

}

Appointment.init(
    {
        appointment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },
    {
        tableName: "appointments",
        sequelize: sequelize,
        // For soft delete
        paranoid: true,
        deletedAt: 'softDelete'
    }
);
