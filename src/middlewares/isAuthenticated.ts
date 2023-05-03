/*                                      Auth Module - Requirements
    4. Allow a patient to sign up to your system by creating an endpoint without needing to authenticate  */

/* This middleware will check if a user is authenticate or not */

import { Request, Response } from "express";
import * as admin from "firebase-admin";

// Function to check if a user is authenticate
export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const { authorization } = req.headers;

    // Check if the authorization header exists
    if (!authorization) {
        return res.status(401).send({ error: 'No authorization header' });
    }
    //No correct scheme(Bearer)
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: 'Bearer schema expected' });
    }
    //Check if the token is valid
    const splittedtoken = authorization.split("Bearer ");
    if (splittedtoken.length !== 2) {
        return res.status(401).send({ error: 'Invalid token' });
    }

    const token = splittedtoken[1];

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        res.locals = {
            ...res.locals,
            email: decodedToken.email,
            uid: decodedToken.uid,
            role: decodedToken.role
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'No authorized' })
    }
    // si todo esto pasa nuestro usuairo esta correctamente autenticado y tiene derecho a acceder a los recursos
}