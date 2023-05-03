import { Router } from 'express';
import controllers from '../controllers';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';

const adminRoutes = Router();
const { adminController } = controllers;

adminRoutes.use(isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }));

// Doctors
adminRoutes.post('/doctors', adminController.createDoctor);
adminRoutes.get('/doctors', adminController.getDoctors);
adminRoutes.put('/doctors/:id', adminController.updateDoctor);
adminRoutes.delete('/doctors/:id', adminController.deleteDoctor);

// Patients
adminRoutes.post('/patients', adminController.createPatient);
adminRoutes.get('/patients', adminController.getPatients);
adminRoutes.put('/patients/:id', adminController.updatePatient);
adminRoutes.delete('/patients/:id', adminController.deletePatient);

adminRoutes.get('/appointments', adminController.getAppointments);

export default adminRoutes;