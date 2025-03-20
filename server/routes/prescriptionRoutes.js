import express from 'express';
import {
    createPrescription,
    getPrescriptionsByPatient,
    updatePrescription,
    deletePrescription
} from '../controllers/prescriptionController.js';

const router = express.Router();

// ➡️ Create Prescription
router.post('/', createPrescription);

// ➡️ Get Prescriptions for a Patient
router.get('/patient/:patientId', getPrescriptionsByPatient);

// ➡️ Update Prescription
router.put('/:id', updatePrescription);

// ➡️ Delete Prescription
router.delete('/:id', deletePrescription);

 export default  router;
