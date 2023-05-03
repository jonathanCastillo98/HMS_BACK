import { InferAttributes, InferCreationAttributes, Model, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "../database/connection";

export class Department extends Model<InferAttributes<Department>, InferCreationAttributes<Department>> {
    declare department_id: CreationOptional<number>;
    declare department: string;
}

Department.init(
    {
        department_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "departments",
        sequelize: sequelize,
    }
);