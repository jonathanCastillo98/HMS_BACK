import { Router } from 'express';
import controllers from '../controllers';
import { existDoctor, existAppointment } from '../middlewares/existEntity';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';

const doctorRoutes = Router();
const { doctorController } = controllers;

doctorRoutes.use(isAuthenticated, isAuthorized({ roles: ['doctor'], allowSameUser: true }), existDoctor);

doctorRoutes.get('/', doctorController.getAllDoctorAppointments);
doctorRoutes.put('/:id', existAppointment, doctorController.changeDate);

export default doctorRoutes;