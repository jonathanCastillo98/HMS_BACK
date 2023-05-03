import { InferAttributes, InferCreationAttributes, Model, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from '../database/connection'

export class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
    declare admin_id: CreationOptional<number>;
    declare user_id: string;
}


Admin.init(
    {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "admins",
        sequelize: sequelize
    }
);
