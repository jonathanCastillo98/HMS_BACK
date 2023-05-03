/* This works as the repo of the auth routes */
import * as admin from 'firebase-admin';

export type Role = 'patient' | 'doctor' | 'admin';

interface User {
    uid: string;
    email: string;
    userName: string;
    role: Role;
    isDisabled: boolean;
}
interface TemporalRole {
    role?: string
}

const mapToUser = (user: admin.auth.UserRecord) => {
    const customClaims = (user.customClaims || { role: "" }) as TemporalRole;
    const role = customClaims.role ? customClaims.role : "";
    return {
        uid: user.uid,
        email: user.email,
        userName: user.displayName,
        role,
        isDisabled: user.disabled
    }
}

// Function to create a user in firebase auth
export const createUser = async (
    displayName: string,
    email: string,
    password: string,
    role: Role
) => {
    const { uid } = await admin.auth().createUser({
        displayName,
        email,
        password
    })

    await admin.auth().setCustomUserClaims(uid, { role });
    return uid
}


// Function to get a user in firebase auth by passing a valid ID
export const readUser = async (uid: string) => {
    const user = await admin.auth().getUser(uid);
    return mapToUser(user);
}


// Function to get all users from firebase
export const getAllUsers = async () => {
    const listOfUsers = await admin.auth().listUsers(10);
    const users = listOfUsers.users.map(mapToUser);

    return users
}


// Function to create a user in f
export const updateUser = async (uid: string, displayName: string, email:string, password:string) => {
    const user = await admin.auth().updateUser(uid, {
        displayName,
        email,
        password

    })

    return mapToUser(user);
}


// Function to disable a user from firebase by passing a valid ID
export const deleteUser = async (uid: string) => {
    await admin.auth().deleteUser(uid)
    return "User deleted from firease";
}