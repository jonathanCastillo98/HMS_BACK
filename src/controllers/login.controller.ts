import { Request, Response } from "express";
const fetch = require('node-fetch');

import * as admin from "firebase-admin";

export const LoginController = (req:Request, res: Response) => {
    try {
        
        const fetchData = async () => {

            const requ = await fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCZpC9dgIcL3LEwi77H-sEuP1zQndiPoG8',
            {
                method:'POST',
                body: JSON.stringify(req.body),
                headers: {'Content-Type': 'application/json'}
            });

            const resp = await requ.json(); 
            const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(resp.idToken);
            
            const respWithRole = {
                ...resp,
                role:decodedToken.role
            } 

            return res.status(200).json(respWithRole)
        } 
        
        fetchData()
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong!' });
    }
}