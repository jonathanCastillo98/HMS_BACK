/* This middleware will check the permissions of each role */

import { Request, Response } from "express";
import { Role } from "../firebase";


//USAMOS UN CLOUSURE
export const isAuthorized = (options: { roles: Role[]; allowSameUser: Boolean }) => {
    return (req: Request, res: Response, next: Function) => {
        const { uid, email, role } = res.locals;
        const { userId } = req.params;

        if (email.split("@")[1] === "admin.com") {
            return next();
        }

        if (options.allowSameUser && userId && userId === uid) {
            return next();
        }

        if (!role) {
            return res.status(403).send("No role was asigned");
        }

        if (options.roles.includes(role)) {
            return next();
        }

        return res.status(403).send("Role no authorized");
    }
}