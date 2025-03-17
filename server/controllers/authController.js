import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { sendEmail } from '../utils/email.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

dotenv.config();

// ✅ Doctor Signup
export const doctorSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = await Doctor.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: 'Doctor registered successfully',
            doctorId: newDoctor.doctorId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Patient Signup (Must provide a valid Doctor ID)
export const patientSignup = async (req, res) => {
    try {
        const { name, email, password, doctorId } = req.body;

        // Check if Doctor ID is valid
        const doctor = await Doctor.findOne({ where: { doctorId } });
        if (!doctor) return res.status(400).json({ message: 'Invalid Doctor ID' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = await Patient.create({
            name,
            email,
            password: hashedPassword,
            doctorId
        });

        res.status(201).json({
            message: 'Patient registered successfully',
            patientId: newPatient.patientId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Login for both Doctors & Patients
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const Model = role === 'doctor' ? Doctor : Patient;

        const user = await Model.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Forgot Password (Generates Reset Token & Sends Email)
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Patient.findOne({ where: { email } }) || await Doctor.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate Reset Token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send Email
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        await sendEmail({
            to: email,
            subject: 'Password Reset Request',
            text: `Click the following link to reset your password: ${resetUrl}. This link will expire in 1 hour.`,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await Patient.findOne({
            where: { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }
        }) || await Doctor.findOne({
            where: { resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Fetch Patients for a Doctor
export const getDoctorPatients = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Find doctor and fetch associated patients
        const doctor = await Doctor.findOne({
            where: { doctorId },
            include: [{ model: Patient, as: 'patients' }]
        });

        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        res.status(200).json({ patients: doctor.patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
