"use strict";
/* This middleware will check the permissions of each role */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
//USAMOS UN CLOUSURE
const isAuthorized = (options) => {
    return (req, res, next) => {
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
    };
};
exports.isAuthorized = isAuthorized;
