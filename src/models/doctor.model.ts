import { DataTypes, Model, CreationOptional, InferCreationAttributes } from "sequelize";
import { sequelize } from '../database/connection';

export class Doctor extends Model<InferCreationAttributes<Doctor>> {
    declare doctor_id: CreationOptional<number>;
    declare user_id: string;
    declare doctor_name: string;
    declare department_id: CreationOptional<number>;
    declare is_available: CreationOptional<boolean>;
}

Doctor.init({
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    doctor_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},
    {
        tableName: "doctors",
        sequelize: sequelize
    })
