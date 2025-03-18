import express from 'express';
import { doctorSignup, patientSignup,login ,forgotPassword ,resetPassword } from '../controllers/authController.js';
const router = express.Router();

router.post('/doctor/signup', doctorSignup);
router.post('/login', login);
router.post('/patient/signup', patientSignup);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetPassword);   

export default router;