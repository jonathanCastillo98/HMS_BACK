import { Router } from 'express';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';
import patientRoutes from './patient.routes';
import doctorRoutes from './doctor.routes';
import { LoginController } from '../controllers/login.controller';

const router = Router();

router.post('/login', LoginController)
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/patient', patientRoutes);
router.use('/doctor', doctorRoutes);

export default router;
