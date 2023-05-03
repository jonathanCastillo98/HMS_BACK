import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
import { sequelize } from '../database/connection'

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
    declare user_id: string;
    declare patient_id: CreationOptional<number>;
    declare patient_name: string;

}

Patient.init(
    {
        patient_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        patient_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "patients",
        sequelize: sequelize
    }
);
