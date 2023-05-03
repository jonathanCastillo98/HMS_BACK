"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.readUser = exports.createUser = void 0;
/* This works as the repo of the auth routes */
const admin = __importStar(require("firebase-admin"));
const mapToUser = (user) => {
    const customClaims = (user.customClaims || { role: "" });
    const role = customClaims.role ? customClaims.role : "";
    return {
        uid: user.uid,
        email: user.email,
        userName: user.displayName,
        role,
        isDisabled: user.disabled
    };
};
// Function to create a user in firebase auth
const createUser = (displayName, email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = yield admin.auth().createUser({
        displayName,
        email,
        password
    });
    yield admin.auth().setCustomUserClaims(uid, { role });
    return uid;
});
exports.createUser = createUser;
// Function to get a user in firebase auth by passing a valid ID
const readUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().getUser(uid);
    return mapToUser(user);
});
exports.readUser = readUser;
// Function to get all users from firebase
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const listOfUsers = yield admin.auth().listUsers(10);
    const users = listOfUsers.users.map(mapToUser);
    return users;
});
exports.getAllUsers = getAllUsers;
// Function to create a user in f
const updateUser = (uid, displayName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield admin.auth().updateUser(uid, {
        displayName,
        email,
        password
    });
    return mapToUser(user);
});
exports.updateUser = updateUser;
// Function to disable a user from firebase by passing a valid ID
const deleteUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    yield admin.auth().deleteUser(uid);
    return "User deleted from firease";
});
exports.deleteUser = deleteUser;
