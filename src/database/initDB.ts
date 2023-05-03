import { createAdmin } from "../middlewares/updateTables";
import { Department } from "../models/departments.model";

export const initDb = () => {
    createAdmin("admin", "admin@admin.com", "123456789");
        Department.findOrCreate({
            where: {
                department: "Psicology"
            }
        })
        Department.findOrCreate({
            where: {
                department: "Cardiology"
            }
        })
        Department.findOrCreate({
            where: {
                department: "Dermatology"
            }
        })
        Department.findOrCreate({
            where: {
                department: "Odontology"
            }
        })
        
}